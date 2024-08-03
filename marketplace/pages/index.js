import WalletInfo from '../components/WalletInfo';

export default function Home() {
  return (
    <div className="container">
      <WalletInfo />
      <header className="header">
        <h1>Welcome to Our Marketplace</h1>
        <p>Discover amazing products curated just for you.</p>
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
      `}</style>
    </div>
  );
}