import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import store, {persistor} from './redux/store/Store.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <PersistGate  loading={<div>Loading...</div>}  persistor={persistor}>
      <App />
  </PersistGate>
</Provider>,
)
