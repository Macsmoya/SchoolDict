import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function Welcome(props) {
  return <h1>Hello, {props}</h1>;
}


function App() {
  const [currentTime, setCurrentTime] = useState(0);

  //TODO #2
  useEffect(() => {
    fetch('http://localhost:5000/api/get-users').then(res => res.json()).then(data => {

      setCurrentTime(data[0][1]);
      console.log(data)
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >

          Learn React
        </a>
        {currentTime === 0 ? 
          <p>LOADING...</p>
        :
        Welcome(currentTime)
        }
      </header>
    </div>
  );
}

export default App;
