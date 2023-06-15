import React, {useEffect, useState } from "react";
import Papa from "papaparse";
import axios from 'axios';
import { addOrUpdateData, getBatteryDataList,getBatteryDataById } from '../../batteryDataService';
import { handleFileSubmission,handleJSONSubmission,getMetadataHash } from "../../ipfsPinningService";
import { AddDataToMap,GetTokenId,HasToken } from "../../TokenStorage";
import contractABI from '../../assets/abi.json';
import Web3 from 'web3';
// Allowed extensions for input file
const allowedExtensions = ["csv"];

const Load = () => {
    // This state will store the parsed data
    const [data, setData] = useState([]);
    // It state will contain the error when
    // correct file extension is not used
    const [error, setError] = useState("");
    // It will store the file uploaded by the user
    const [file, setFile] = useState("");
    const [accounts, setAccounts] = useState([]);
    const [contract, setContract] = useState(null);
 
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

    // This function will be called when
    // the file input changes
    const handleFileChange = (e) => {
        setError("");
        // Check if user has entered the file
        if (e.target.files.length) {
            const inputFile = e.target.files[0];
            console.log(inputFile);
 
            // Check the file extensions, if it not
            // included in the allowed extensions
            // we show the error
            const fileExtension = inputFile?.name.split(".")[1];
            if (!allowedExtensions.includes(fileExtension)) {
                setError("Please input a csv file");
                return;
            }
 
            // If input type is correct set the state
            setFile(inputFile);
        }
    };
    const handleParse = () => {
 
        // If user clicks the parse button without
        // a file we show a error
        if (!file) return setError("Enter a valid file");
 
        // Initialize a reader which allows user
        // to read any file or blob.
        const reader = new FileReader();
 
        // Event listener on reader when the file
        // loads, we parse it and set the data.
        reader.onload = async ({ target }) => {
            const csv = Papa.parse(target.result, { header: true });
            const parsedData = csv?.data;
            const columns = Object.keys(parsedData[0]);
            parsedData.forEach(element => {
                //Make array out of element data so we can properly use it
                const values = Object.values(element);
                addOrUpdateData(values[0],values[1],values[2],values[6],values[7],values[3],values[4],values[5],values[8],values[9])
            });
            console.log(getBatteryDataList())
            setData(columns);
            await handleJSONSubmission(parsedData[parsedData.length - 1].RUL,parsedData[0].Battery_ID)
            if(HasToken(parsedData[0].Battery_ID)) {
                await contract.methods.update(GetTokenId(parsedData[0].Battery_ID), getMetadataHash()).send({ from: accounts[0] });
            } else {
                let receivedToken = await contract.methods.create(getMetadataHash()).send({ from: accounts[0] });
                AddDataToMap(parsedData[0].Battery_ID, receivedToken);
            }
            await handleFileSubmission(file)
        };
        reader.readAsText(file);
    };
 
    return (
        <div>
            <label htmlFor="csvInput" style={{ display: "block" }}>
                Enter CSV File
            </label>
            <input
                onChange={handleFileChange}
                id="csvInput"
                name="file"
                type="File"
            />
            <div>
                <button onClick={handleParse}>Parse</button>
            </div>
            <div style={{ marginTop: "3rem" }}>
                {error ? error : data.map((col,
                    idx) => <div key={idx}>{col}</div>)}
            </div>
        </div>
    );
};

export default Load;