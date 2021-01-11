import React from 'react';
import { Route, Link, Redirect, Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <ul className="navbar">
        <li className="nav_title">IS Food Recipes</li>
        <li className="nav_item">
          <Link className="nav_link" to="/about">About</Link>
        </li>
        <li className="nav_item">
          <Link className="nav_link"to="/home">Home</Link>
        </li>
      </ul>
    </div>
  );
}

export default App;
