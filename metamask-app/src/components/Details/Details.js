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
          <h5 className="card-title">Data ID: {data.id}</h5>
          <p className="card-text">Address: {data.address}</p>
          <p className="card-text">CycleIndex: {data.cycleIndex}</p>
          <p className="card-text">DischargeTime: {data.dischargeTime}</p>
          <p className="card-text">TimeAt4_15V: {data.timeAt4_15V}</p>
          <p className="card-text">TimeConstantCurrent: {data.timeConstantCurrent}</p>
          <p className="card-text">DecrementTime: {data.decrementTime}</p>
          <p className="card-text">MaxVoltageDischarge: {data.maxVoltageDischarge}</p>
          <p className="card-text">MinVoltageDischarge: {data.minVoltageDischarge}</p>
          <p className="card-text">ChargeTime: {data.chargeTime}</p>
          <p className="card-text">RemainingUsefulLife: {data.remainingUsefulLife}</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
