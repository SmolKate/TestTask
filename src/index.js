
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

// Creation of container for html body
const container = document.getElementById('root');
const root = createRoot(container);

// Creation of store
export const store = configureStore({
  reducer: rootReducer,
  },
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <Router>
      <App />
    </Router>  
    </Provider>
  </React.StrictMode>
);

reportWebVitals();

// Saving created store to local storage
localStorage.setItem('redux_store', JSON.stringify(store.getState()));
