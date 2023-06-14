import React from 'react';
import './Details.css';
import { useParams } from 'react-router-dom'; // Import useParams to get the ID from the URL
import { getBatteryDataById } from '../../batteryDataService'; // Import the data list

const Details = () => {
  const { id } = useParams(); // Get the ID from the URL

  // Find the data item with the matching ID
  const data = getBatteryDataById(id);

  // Render the details of the selected item
  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Data ID: {data.Id}</h5>
          <p className="card-text">Address: {data.Address}</p>
          <p className="card-text">CycleIndex: {data.CycleIndex}</p>
          <p className="card-text">DischargeTime: {data.DischargeTime}</p>
          <p className="card-text">TimeAt4_15V: {data.TimeAt4_15V}</p>
          <p className="card-text">TimeConstantCurrent: {data.TimeConstantCurrent}</p>
          <p className="card-text">DecrementTime: {data.DecrementTime}</p>
          <p className="card-text">MaxVoltageDischarge: {data.MaxVoltageDischarge}</p>
          <p className="card-text">MinVoltageDischarge: {data.MinVoltageDischarge}</p>
          <p className="card-text">ChargeTime: {data.ChargeTime}</p>
          <p className="card-text">RemainingUsefulLife: {data.RemainingUsefulLife}</p>
          {/* Add more details here */}
        </div>
      </div>
    </div>
  );
};

Details.propTypes = {};

Details.defaultProps = {};

export default Details;
