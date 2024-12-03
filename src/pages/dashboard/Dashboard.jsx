import React from 'react'
import TaskForm from '../../components/taskForm/TaskForm'
import './dashboard.css'
import { useDispatch } from 'react-redux';
import { addTask,deleteTask,updateTask } from "../../redux/slices/taskSlice";
function Dashboard() {
    const dispatch=useDispatch()
    const handleTaskSubmit = (task) => {
        dispatch(addTask(task))
        console.log("New task submitted:", task);
      };
    
      return (
        <div>
          <h1 className='dashboard-heading'>Task Management</h1>
          <TaskForm onSubmit={handleTaskSubmit} />
        </div>
      );
}

export default Dashboard