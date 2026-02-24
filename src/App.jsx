import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import WriteupDetail from './pages/WriteupDetail';
import CTFList from './pages/CTFList';
import WriteupsByCTF from './pages/WriteupsByCTF';
import WriteupsByCategory from './pages/WriteupsByCategory';

function App() {
  return (
    <Router>
      <div className="bg-grid"></div>
      <div className="bg-mesh"></div>

      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/writeups" element={<CTFList />} />
          <Route path="/ctf/:ctfId" element={<WriteupsByCTF />} />
          <Route path="/category/:category" element={<WriteupsByCategory />} />
          <Route path="/writeup/:id" element={<WriteupDetail />} />
        </Routes>
      </main>

      <footer className="container" style={{
        marginTop: '10rem',
        paddingBottom: '5rem',
        borderTop: '1px solid var(--border)',
        paddingTop: '3rem',
        textAlign: 'center',
        color: 'var(--text-dim)',
        fontSize: '0.9rem'
      }}>
        <p>&copy; {new Date().getFullYear()} Xfnx. Built with React & Passion for Security.</p>
      </footer>
    </Router>
  );
}

export default App;
