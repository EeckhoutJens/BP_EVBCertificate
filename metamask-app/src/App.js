import React from 'react';
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <div id="sidebar">
        <img key="assets/logo.jpg" src="assets/logo.jpg" />
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
              <a href={`/create`}>Create Battery</a>
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
