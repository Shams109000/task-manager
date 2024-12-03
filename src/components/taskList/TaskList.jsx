import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteTask, updateTask, reorderTasks } from "../../redux/slices/taskSlice";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./taskList.css";

const TaskList = () => {
  const dispatch = useDispatch();
  const taskList = useSelector((state) => state.task.taskList);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [filter, setFilter] = useState("all");

  const handleDeleteClick = (id) => {
    setTaskToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      dispatch(deleteTask(taskToDelete));
      setShowModal(false);
      setTaskToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setTaskToDelete(null);
  };

  const handleMarkCompleted = (id) => {
    const task = taskList.find((task) => task.id === id);
    if (task) {
      dispatch(updateTask({ id, updatedTask: { ...task, completed: !task.completed } }));
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/task/${id}`);
  };

  // Filter tasks based on the selected filter option
  const getFilteredTasks = () => {
    const currentDate = new Date();
    let filteredTasks = taskList;

    // Apply the selected filter option
    if (filter === "completed") {
      filteredTasks = taskList.filter((task) => task.completed);
    } else if (filter === "pending") {
      filteredTasks = taskList.filter((task) => !task.completed);
    } else if (filter === "overdue") {
      filteredTasks = taskList.filter(
        (task) => new Date(task.dueDate) < currentDate && !task.completed
      );
    }

    return filteredTasks;
  };

  // Drag-and-drop logic for reordering tasks
  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) {
      return; // Dropped outside the list
    }
    if (destination.index === source.index) {
      return; // No movement
    }
    
    const reorderedTasks = Array.from(taskList);
    const [removed] = reorderedTasks.splice(source.index, 1);
    reorderedTasks.splice(destination.index, 0, removed);

    dispatch(reorderTasks(reorderedTasks)); // Dispatch the reorder action
  };

  return (
    <div className="task-list">
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Are you sure you want to delete this task?</p>
            <div className="modal-actions">
              <button onClick={confirmDelete} className="confirm-btn">
                Yes
              </button>
              <button onClick={cancelDelete} className="cancel-btn">
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <h2>Task List</h2>

      {/* Filter Options */}
      <div className="filter-options d-flex flex-md-row flex-column justify-content-center align-items-center">
        <button className="col-md-4 col-sm-12" onClick={() => setFilter("all")}>
          All Tasks
        </button>
        <button className="col-md-4 col-sm-12" onClick={() => setFilter("completed")}>
          Completed Tasks
        </button>
        <button className="col-md-4 col-sm-12" onClick={() => setFilter("pending")}>
          Pending Tasks
        </button>
        <button className="col-md-4 col-sm-12" onClick={() => setFilter("overdue")}>
          Overdue Tasks
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="taskList">
          {(provided) => (
            <div
              className="task-items"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {getFilteredTasks().length === 0 ? (
                <p>No tasks available. Please add a task.</p>
              ) : (
                getFilteredTasks().map((task, index) => (
                  <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                    {(provided) => (
                      <div
                        className="task-item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <h3
                          style={{
                            textDecoration: task.completed ? "line-through" : "none",
                          }}
                        >
                          {task.title}
                        </h3>
                        <p>{task.description}</p>
                        <p>Due Date: {task.dueDate}</p>
                        <div className="task-actions">
                          <button
                            onClick={() => handleMarkCompleted(task.id)}
                            style={{
                              backgroundColor: task.completed ? "green" : "orange",
                              color: "white",
                            }}
                          >
                            {task.completed ? "Mark as Incomplete" : "Mark as Completed"}
                          </button>
                          <button
                            onClick={() => handleViewDetails(task.id)}
                            style={{
                              backgroundColor: "blue",
                              color: "white",
                            }}
                          >
                            Edit Details
                          </button>
                          <button
                            onClick={() => handleDeleteClick(task.id)}
                            className="delete-btn"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TaskList;
