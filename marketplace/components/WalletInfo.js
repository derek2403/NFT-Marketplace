import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';

export default function WalletInfo() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          const address = accounts[0];
          const balance = await provider.getBalance(address);

          console.log("Setting account:", address);
          setAccount(address);
          setBalance(ethers.formatEther(balance));
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        setIsLoading(true);
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const balance = await provider.getBalance(address);

        console.log("Setting account:", address);
        setAccount(address);
        setBalance(ethers.formatEther(balance));
        setIsLoading(false);

        router.push('/product');
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        setIsLoading(false);
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this feature.");
    }
  };

  const getDisplayAddress = (addr) => {
    console.log("Rendering account:", addr);
    if (typeof addr === 'string') {
      return addr;
    } else if (addr && typeof addr.address === 'string') {
      return addr.address;
    } else if (addr && typeof addr.toString === 'function') {
      return addr.toString();
    } else {
      return 'Unknown Address';
    }
  };

  return (
    <div className="walletInfo">
      {account ? (
        <div className="walletDetails">
          <p className="hoverText">Hover to see details</p>
          <div className="walletHover">
            <p>Address: {getDisplayAddress(account)}</p>
            <p>Balance: {balance} ETH</p>
          </div>
        </div>
      ) : (
        <button onClick={connectWallet} disabled={isLoading} className="loginButton">
          {isLoading ? "Connecting..." : "Login with MetaMask"}
        </button>
      )}
      <p>Connection status: {account ? 'Connected' : 'Not connected'}</p>
      <style jsx>{`
        .walletInfo {
          position: fixed;
          top: 20px;
          left: 20px;
          background: #fff;
          border-radius: 10px;
          padding: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          text-align: center;
          min-width: 200px;
        }

        .walletDetails {
          position: relative;
        }

        .walletHover {
          display: none;
          background-color: #f1f1f1;
          border-radius: 8px;
          padding: 10px;
          position: absolute;
          top: 100%;
          left: 90%;
          transform: translateX(-50%);
          width: 360px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
          text-align: left;
        }

        .walletDetails:hover .walletHover {
          display: block;
        }

        .hoverText {
          font-size: 0.9rem;
          color: #6c757d;
          margin-bottom: 5px;
        }

        .loginButton {
          padding: 10px 20px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
          transition: background-color 0.3s ease;
          width: 100%;
        }

        .loginButton:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }

        .loginButton:hover:enabled {
          background-color: #005bb5;
        }

        p {
          margin: 5px 0;
          color: #343a40;
        }
      `}</style>
    </div>
  );
}