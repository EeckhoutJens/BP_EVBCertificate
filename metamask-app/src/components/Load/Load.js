import React, { useEffect, useState } from "react";
import axios from 'axios';
import Papa from "papaparse";
import { handleFileSubmission, handleJSONSubmission, getMetadataHash } from "../../ipfsPinningService";
import contractABI from '../../assets/abi.json';
import { HasToken,GetTokenId,AddDataToMap } from "../../TokenStorage";
import Web3 from 'web3';

// Allowed extensions for input file
const allowedExtensions = ["csv"];

const Load = () => {
    // This state will store the parsed data
    const [data, setData] = useState([]);
    // It state will contain the error when correct file extension is not used
    const [error, setError] = useState("");
    // It will store the file uploaded by the user
    const [file, setFile] = useState("");
    const [accounts, setAccounts] = useState([]);
    const [contract, setContract] = useState(null);
    //const history = useHistory();

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

    // This function will be called when the file input changes
    const handleFileChange = (e) => {
        setError("");
        // Check if user has entered the file
        if (e.target.files.length) {
            const inputFile = e.target.files[0];
            console.log(inputFile);

            // Check the file extensions, if it not included in the allowed extensions we show the error
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

        // If user clicks the parse button without a file we show a error
        if (!file) return setError("Enter a valid file");

        // Initialize a reader which allows user to read any file or blob.
        const reader = new FileReader();

        // Event listener on reader when the file loads, we parse it and set the data.
        reader.onload = async ({ target }) => {
            const csv = Papa.parse(target.result, { header: true });
            const parsedData = csv?.data;
            const columns = Object.keys(parsedData[0]);
            localStorage.setItem('savedData', JSON.stringify(parsedData));
            setData(columns);
            await handleJSONSubmission(parsedData[parsedData.length - 1].RUL, String(parsedData[0].Battery_ID))
            const retrievedID = localStorage.getItem(String(parsedData[0].Battery_ID))
            if (retrievedID != null) {
                await contract.methods.update(retrievedID, getMetadataHash()).send({ from: accounts[0] });
            } else {
                let uri = "ipfs://";
                uri = uri.concat(getMetadataHash())
                 let receivedToken = await contract.methods.create(uri).send({ from: accounts[0] });
                 receivedToken = parseInt(receivedToken.logs[0].topics[3])
                localStorage.setItem(String(parsedData[0].Battery_ID), receivedToken);
                AddDataToMap(parsedData[0].Battery_ID, receivedToken);
            }
            await handleFileSubmission(file)
        };
        reader.readAsText(file);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="card mb-4">
                        <div className="card-body">
                            <div className="mb-3" >
                                <label htmlFor="csvInput" className="form-label">Enter CSV File:</label>
                                <input className="form-control" onChange={handleFileChange} id="csvInput" name="file" type="File" />
                            </div>
                            <button className="btn btn-primary" onClick={handleParse}>Parse</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                {error ? error : data.map((col, idx) => (
                    <div className="col-md-4" key={idx}>
                        <div className="card mb-4">
                            <div className="card-body">
                                <div>{col}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Load;
