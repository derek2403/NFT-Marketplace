import { useState, useEffect } from 'react';
import WalletInfo from '../components/WalletInfo';
import { ethers } from 'ethers';

export default function Product() {
  const [products, setProducts] = useState([]);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    // Fetch product data from JSON file
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    }
    fetchProducts();

    // Setup ethers.js provider and signer
    if (window.ethereum) {
      const newProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(newProvider);
      newProvider.getSigner().then((signer) => {
        setSigner(signer);
        signer.getAddress().then(setAccount);
      });
    }
  }, []);

  const buyProduct = async (price) => {
    if (!signer || !account) {
      alert('Please connect your wallet first.');
      return;
    }

    try {
      const transaction = {
        to: "0xEE094A71d8A47db268A35Ae3d3a2835113D0977e", // Replace with the seller's Ethereum address
        value: ethers.parseEther(price), // Convert the price to wei
        // you can add more transaction options here if needed
      };

      const txResponse = await signer.sendTransaction(transaction);
      console.log('Transaction response:', txResponse);
      alert('Transaction sent! Waiting for confirmation...');
      await txResponse.wait();
      alert('Transaction confirmed!');
    } catch (error) {
      console.error('Transaction failed:', error);
      alert('Transaction failed!');
    }
  };

  return (
    <div className="container">
      <WalletInfo />
      <h1>Our Products</h1>
      <ul className="productList">
        {products.map((product) => (
          <li key={product.id} className="productItem">
            <img src={product.image} alt={product.name} className="productImage" />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p className="price">Price: {product.price} ETH</p>
            <button className="buyButton" onClick={() => buyProduct(product.price)}>
              Buy
            </button>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .container {
          padding: 40px;
          background-color: #f8f9fa;
          min-height: 100vh;
        }

        h1 {
          text-align: center;
          color: #343a40;
          margin-bottom: 20px;
        }

        .productList {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .productItem {
          background-color: white;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: space-between; /* Ensure button is aligned at the bottom */
          height: 100%; /* Ensure all cards are of equal height */
        }

        .productItem:hover {
          transform: translateY(-10px);
          box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
        }

        .productImage {
          max-width: 100%;
          height: auto;
          border-radius: 5px;
          margin-bottom: 15px;
        }

        h2 {
          color: #0070f3;
          margin-bottom: 10px;
        }

        p {
          color: #6c757d;
          margin: 5px 0;
        }

        .price {
          font-weight: bold;
          color: #343a40;
        }

        .buyButton {
          padding: 10px 20px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
          transition: background-color 0.3s ease;
          width: 100%;
          margin-top: 10px;
        }

        .buyButton:hover {
          background-color: #218838;
        }
      `}</style>
    </div>
  );
}
