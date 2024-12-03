// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import taskSlice from '../slices/taskSlice'
import storage from 'redux-persist/lib/storage'; // Default storage (localStorage)
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root1', // Key for localStorage
  storage,
};
const rootReducer = combineReducers({
  task: taskSlice,
  // Add other slices here
});
const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
});

// Create persistor
export const persistor = persistStore(store);

export default store;