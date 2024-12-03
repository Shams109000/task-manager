import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTask } from "../../redux/slices/taskSlice"; // Import your addTask action
import { ToastContainer, toast } from "react-toastify"; // Import toastify
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import "./TaskForm.css"; // Import the CSS file

const TaskForm = ({ task, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setDueDate(task.dueDate || "");
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !dueDate) {
      alert("Title and Due Date are required!");
      return;
    }

    // Dispatch the action to add the task
    const newTask = { id: Math.random(), title, description, dueDate, completed: false };
    dispatch(addTask(newTask));

    // Show success toast notification
    toast.success("Task added successfully!");

    // Clear form fields
    setTitle("");
    setDescription("");
    setDueDate("");

    // Redirect to task list after a small delay
    setTimeout(() => {
      navigate("/taskList");
    }, 2000); // Redirect after 2 seconds
  };

  return (
    <div>
      <form className="form-container" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Title"
          className="input-field"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="input-field textarea-field"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
        ></textarea>
        <input
          type="date"
          className="input-field"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <button type="submit" className="submit-button">
          {task ? "Update Task" : "Add Task"}
        </button>
      </form>

      {/* Toast Notification Container */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

TaskForm.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    dueDate: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
};

export default TaskForm;
