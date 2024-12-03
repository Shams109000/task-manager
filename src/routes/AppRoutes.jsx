import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dashboard from '../pages/dashboard/Dashboard';
import TaskForm from '../components/taskForm/TaskForm';
import TaskList from '../components/taskList/TaskList';
import EditTaskDetails from '../components/taskDetails/EditTaskDetails';
import Navbar from '../components/navbar/Navbar';
function AppRoutes() {
  
  return (
    <div>
      <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Dashboard/>}></Route>
        <Route path='/taskForm' element={<TaskForm/>}></Route>
        <Route path='/taskList' element={<TaskList/>}></Route>
        <Route path='/task/:id' element={<EditTaskDetails/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default AppRoutes