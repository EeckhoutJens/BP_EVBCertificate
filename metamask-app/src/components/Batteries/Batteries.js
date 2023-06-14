import React from 'react';
import './Batteries.css';
import { Link } from 'react-router-dom'; // Import Link and useHistory
import { getBatteryDataList } from '../../batteryDataService'; // Import the data list

const Batteries = () => {
  const dataList = getBatteryDataList();

  // Retrieve the data list
  return (
    <div className="container">
      <div className="row">
        {/* Data cards */}
        {dataList.map((data) => (
          <div className="col-md-4" key={data.Id}>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Data ID: {data.Id}</h5>
                <p className="card-text">Address: {data.Address}</p>
                <p className="card-text">CycleIndex: {data.CycleIndex}</p>
                <Link to={`/details/${data.Id}`} className="btn btn-primary">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Batteries;
