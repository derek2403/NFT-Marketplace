import { useState, useEffect } from 'react';
import WalletInfo from '../components/WalletInfo';

export default function Product() {
  const [products, setProducts] = useState([]);

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
  }, []);

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
      `}</style>
    </div>
  );
}