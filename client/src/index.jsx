import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import { AuthProvider } from './contexts/AuthContext';
import { SpinnerProvider } from './contexts/SpinnerContext';
import './assets/index.css';
import './assets/utilities.css';
import 'react-photo-view/dist/react-photo-view.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <SpinnerProvider>
        <App />
      </SpinnerProvider>
    </AuthProvider>
  </React.StrictMode>
);
