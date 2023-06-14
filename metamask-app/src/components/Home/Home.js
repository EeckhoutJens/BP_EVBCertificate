import React, { useEffect, useState } from 'react';
import './Home.css';
import { IpfsImage } from 'react-ipfs-image';

const Home = () => {
  const [accounts, setAccounts] = useState([]);
  const [balance, setBalance] = useState('');

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

        // Get the account balance
        const balance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [accounts[0], 'latest'],
        });
        setBalance(balance);

      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('MetaMask extension not detected!');
    }
  };

  return (
    <div className="container">
      <div className="card mt-4 p-4">
        <h1 className="mb-4">MetaMask Integration</h1>
        <p>Connected Account: {accounts.length > 0 ? accounts[0] : 'Not connected'}</p>
        <p>Account Balance: {balance}</p>
      </div>
      <div className="row pt-4">
        <div className="col-md-4">
          <div className="card mb-2">
            <div className="card-body">
            <IpfsImage className="col-md-4" hash='QmWx4R1jtp7gYbHdMkTLYVdSjwNCyWawsfKK5Hb7asXz8P' gatewayUrl='https://tomato-shaky-beaver-192.mypinata.cloud/ipfs' />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-2">
            <div className="card-body">
            <IpfsImage className="col-md-4" hash='Qmcr3EcFKyGwYYcS1Use4CvF1n1hUcTMqpc2p7MaDmV44t' gatewayUrl='https://tomato-shaky-beaver-192.mypinata.cloud/ipfs' />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-2">
            <div className="card-body">
            <IpfsImage className="col-md-4" hash='QmNQw9ieGVttUXWTRQFEmsuFqmLuaAoq51jmp7zBvvju6J' gatewayUrl='https://tomato-shaky-beaver-192.mypinata.cloud/ipfs' />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-2">
            <div className="card-body">
            <IpfsImage className="col-md-4" hash='QmNUxNHE63R5pskkcmRbfnotg6qLiUQPHVkacyaC9odRUK' gatewayUrl='https://tomato-shaky-beaver-192.mypinata.cloud/ipfs' />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-2">
            <div className="card-body">
            <IpfsImage className="col-md-4" hash='QmPNzRaPevZiwPHsJeiJzjheX5ETAJCvzsf2ynvCzoFcpB' gatewayUrl='https://tomato-shaky-beaver-192.mypinata.cloud/ipfs' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
