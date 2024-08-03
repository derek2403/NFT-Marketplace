import WalletInfo from '../components/WalletInfo';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const navigateToProducts = () => {
    router.push('/product');
  };

  return (
    <div className="container">
      <WalletInfo />
      <header className="header">
        <h1>Welcome to Our Marketplace</h1>
        <p>Discover amazing NFTs curated just for you.</p>
        <a className="showProductsLink" onClick={navigateToProducts}>
          Show Products
        </a>
      </header>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(to right, #f8f9fa, #e9ecef);
          text-align: center;
        }

        .header {
          margin-bottom: 40px;
        }

        h1 {
          font-size: 3rem;
          color: #343a40;
          margin-bottom: 0.5rem;
        }

        p {
          font-size: 1.2rem;
          color: #6c757d;
        }

        .showProductsLink {
          display: inline-block;
          margin-top: 20px;
          font-size: 1.2rem;
          color: #0070f3;
          text-decoration: none;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .showProductsLink:hover {
          color: #0056b3;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
