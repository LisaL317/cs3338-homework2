import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [visits, setVisits] = useState(null);

  useEffect(() => {
    // Fetch data from the backend
    axios.get('http://localhost:5000')  // This URL will point to the backend || IF YOU CHANGE LOCALHOST YOU NEED TO CHANGE THIS
      .then(response => {
        setMessage(response.data.message);
        setVisits(response.data.visits);
      })
      .catch(error => {
        console.error("There was an error fetching the message:", error);
        setMessage("Could not reach the backend.");
      });
  }, []);

  return (
    <div className="App">
      <h1>Welcome to the frontend!</h1>
      <hr />
      <h2>{message}</h2>
      {visits !== null && <h3>This page has been visited {visits} {visits === 1 ? 'time' : 'times'} (saved in Postgres)</h3>}
    </div>
  );
}

export default App;
