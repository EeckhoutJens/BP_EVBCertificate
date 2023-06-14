import React from 'react';
import './Details.css';
import { useParams } from 'react-router-dom';
import { getBatteryDataById } from '../../batteryDataService';

const Details = () => {
  const { id } = useParams(); // Get id from the url

  // Find data item with the matching id
  const data = getBatteryDataById(id);

  // Show details of the selected item
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
        </div>
      </div>
    </div>
  );
};

export default Details;
