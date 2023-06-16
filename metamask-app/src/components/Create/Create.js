import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Web3 from 'web3';
import './Create.css';
import contractABI from '../../assets/abi.json';

const Create = () => {
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [formData, setFormData] = useState({
    address: '',
    cycleIndex: '',
    dischargeTime: '',
    timeAt415V: '',
    timeConstantCurrent: '',
    decrementTime: '',
    maxVoltageDischarge: '',
    minVoltageDischarge: '',
    chargeTime: '',
    remainingUsefulLife: '',
  });

  useEffect(() => {
    loadMetaMaskData();
  }, []);

  const loadMetaMaskData = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Get the list of accounts
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        setAccounts(accounts);

        // Connect to the contract
        const web3 = new Web3(window.ethereum);
        const contractAddress = '0xab149423bd1052efe1f696cee47289f8db34e40c';
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        setContract(contract);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('MetaMask extension not detected!');
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const {
        cycleIndex,
        dischargeTime,
        timeAt415V,
        timeConstantCurrent,
        decrementTime,
        maxVoltageDischarge,
        minVoltageDischarge,
        chargeTime,
        remainingUsefulLife,
      } = formData;

      var result = cycleIndex + dischargeTime + timeAt415V + timeConstantCurrent + decrementTime + maxVoltageDischarge + minVoltageDischarge + chargeTime + remainingUsefulLife;

      let uri = "";
      if (result > 1000) {
        uri = "ipfs://Qmdxtu7qjzw9BUDaMVHgT3ahYSCxzeWo6EnopC7sMxZ57H";
      } else if (result > 800 && result < 1000) {
        uri = "ipfs://QmdwP61i3PTvwgJUAtBU8UtCx6e6JEHAY6mmbNueUdDC7S";
      } else if (result > 600 && result < 800) {
        uri = "ipfs://QmSuXKPUYnF4dhb2YQvE5RpkoijG6zfsbSGTfV9EQKxkoq";
      } else if (result > 400 && result < 600) {
        uri = "ipfs://QmZBvKyfkmWWNvz79NoDjG9nHXpxjXdyjHmYYuvEp2HCrn";
      } else{
        uri = "ipfs://QmR1GmjiqwpDReNV8MzX1PMRvrVLiYEecFEZBE7pqaAhuG";
      }

      let tokenId = await contract.methods.create(uri).send({ from: accounts[0] });

      console.log(tokenId);
      console.log('Data added successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="card mt-4 p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="cycleIndex" className="form-label">Cycle Index:</label>
            <input type="number" className="form-control" id="cycleIndex" name="cycleIndex" value={formData.cycleIndex} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="dischargeTime" className="form-label">Discharge Time:</label>
            <input type="number" className="form-control" id="dischargeTime" name="dischargeTime" value={formData.dischargeTime} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="timeAt415V" className="form-label">Time at 4.15V:</label>
            <input type="number" className="form-control" id="timeAt415V" name="timeAt415V" value={formData.timeAt415V} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="timeConstantCurrent" className="form-label">Time Constant Current:</label>
            <input type="number" className="form-control" id="timeConstantCurrent" name="timeConstantCurrent" value={formData.timeConstantCurrent} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="decrementTime" className="form-label">Decrement Time:</label>
            <input type="number" className="form-control" id="decrementTime" name="decrementTime" value={formData.decrementTime} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="maxVoltageDischarge" className="form-label">Max Voltage Discharge:</label>
            <input type="number" className="form-control" id="maxVoltageDischarge" name="maxVoltageDischarge" value={formData.maxVoltageDischarge} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="minVoltageDischarge" className="form-label">Min Voltage Discharge:</label>
            <input type="number" className="form-control" id="minVoltageDischarge" name="minVoltageDischarge" value={formData.minVoltageDischarge} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="chargeTime" className="form-label">Charge Time:</label>
            <input type="number" className="form-control" id="chargeTime" name="chargeTime" value={formData.chargeTime} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="remainingUsefulLife" className="form-label">Remaining Useful Life:</label>
            <input type="number" className="form-control" id="remainingUsefulLife" name="remainingUsefulLife" value={formData.remainingUsefulLife} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary">Add Certificate</button>
        </form>
      </div>
    </div>
  );
};

export default Create;
