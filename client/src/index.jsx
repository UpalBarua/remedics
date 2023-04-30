import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import 'react-photo-view/dist/react-photo-view.css';
import './assets/index.css';
import './assets/utilities.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
