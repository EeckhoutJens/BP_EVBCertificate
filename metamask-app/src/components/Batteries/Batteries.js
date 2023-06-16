import React from 'react';
import './Batteries.css';
import { Link } from 'react-router-dom';
import { getBatteryDataList } from '../../batteryDataService';

const Batteries = () => {
  const savedData = JSON.parse(localStorage.getItem('savedData'));
  const dataList = getBatteryDataList(savedData);
 
  // Retrieve the data list
  return (
    <div className="container">
      <div className="row">
        {dataList.map((data) => (
          <div className="col-md-4" key={data.id}>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Data ID: {data.id}</h5>
                <p className="card-text">CycleIndex: {data.cycleIndex}</p>
                <Link to={`/details/${data.id}`} className="btn btn-primary">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Batteries;
