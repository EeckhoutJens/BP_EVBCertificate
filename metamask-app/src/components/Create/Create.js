import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Web3 from 'web3';
import './Create.css';

const Create = () => {
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
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
        const contractAddress = '0xf57A73d325AbAe4f89e1d03d61C5b0276733B40F'; // Replace with your contract address
        const contractABI = [
          {
            "inputs": [
              {
                "internalType": "int256",
                "name": "data",
                "type": "int256"
              }
            ],
            "name": "AddNewData",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "owner",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "storedData",
            "outputs": [
              {
                "internalType": "int256",
                "name": "",
                "type": "int256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          }
        ];
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
        // id,
        // address,
        // cycleIndex,
        // dischargeTime,
        // timeAt415V,
        // timeConstantCurrent,
        // decrementTime,
        // maxVoltageDischarge,
        // minVoltageDischarge,
        // chargeTime,
        remainingUsefulLife,
      } = formData;

      await contract.methods.AddNewData(
          // id,
          // address,
          // parseInt(cycleIndex),
          // parseInt(dischargeTime),
          // parseInt(timeAt415V),
          // parseInt(timeConstantCurrent),
          // parseInt(decrementTime),
          // parseInt(maxVoltageDischarge),
          // parseInt(minVoltageDischarge),
          // parseInt(chargeTime),
          parseInt(remainingUsefulLife)
        )
        .send({ from: accounts[0] });

      console.log('Data added successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="card mt-4 p-4">
        <form onSubmit={handleSubmit}>
          {/* <div className="mb-3">
            <label htmlFor="id" className="form-label">Id:</label>
            <input type="text" className="form-control" id="id" name="id" value={formData.id} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address:</label>
            <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleChange} />
          </div>
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
          </div> */}
          <div className="mb-3">
            <label htmlFor="remainingUsefulLife" className="form-label">Remaining Useful Life:</label>
            <input type="number" className="form-control" id="remainingUsefulLife" name="remainingUsefulLife" value={formData.remainingUsefulLife} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary">Add Data</button>
        </form>
      </div>
    </div>
  );
};

export default Create;
