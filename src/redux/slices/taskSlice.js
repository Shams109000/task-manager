import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    taskList: [], // This will hold your task array
  },
  reducers: {
    addTask: (state, action) => {
      state.taskList.push(action.payload);
    },
    updateTask: (state, action) => {
      const { id, updatedTask } = action.payload;
      const index = state.taskList.findIndex((task) => task.id === id);
      if (index !== -1) {
        state.taskList[index] = { ...state.taskList[index], ...updatedTask };
      }
    },
    deleteTask: (state, action) => {
      state.taskList = state.taskList.filter((task) => task.id !== action.payload);
    },
    reorderTasks: (state, action) => {
      state.taskList = action.payload;
    },
  },
});

export const { addTask, updateTask, deleteTask,reorderTasks } = taskSlice.actions;
export default taskSlice.reducer;
