import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Importing the main App component

// Rendering the App component inside the div with id="root" from the index.html file
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

