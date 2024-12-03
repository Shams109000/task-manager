import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateTask } from '../../redux/slices/taskSlice';
import './editTaskDetail.css'
const EditTaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const taskList = useSelector((state) => state.task.taskList);
  const task = taskList.find((task) => task.id == id); 

  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [dueDate, setDueDate] = useState(task?.dueDate || '');
  const [completed, setCompleted] = useState(task?.completed || false);

  if (!task) {
    return <p>Task not found.</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      id: task.id,
      updatedTask: {
        title,
        description,
        dueDate,
        completed,
      },
    };

    dispatch(updateTask(updatedTask));
    navigate('/taskList'); // Redirect to the task list after updating
  };

  return (
    <div className="task-details">
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="completed">Status:</label>
          <select
            id="completed"
            value={completed ? 'completed' : 'incomplete'}
            onChange={(e) => setCompleted(e.target.value === 'completed')}
          >
            <option value="incomplete">Incomplete</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default EditTaskDetails;
