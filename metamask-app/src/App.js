import React from 'react';
import { Outlet } from "react-router-dom";
import logo from './assets/logo.jpg';

const App = () => {
  return (
    <>
      <div id="sidebar">
      <img src={logo} className="App-logo" alt="logo" />
        <h1>Battery app</h1>
        <nav>
          <ul>
            <li>
              <a href={`/home`}>Home</a>
            </li>
            <li>
              <a href={`/batteries`}>Batteries</a>
            </li>
            <li>
              <a href={`/create`}>Create Certificate</a>
            </li>
            <li>
              <a href={`/update`}>Update Certificate</a>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
};

export default App;
