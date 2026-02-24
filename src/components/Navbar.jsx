import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Github, Linkedin, Mail } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="glass" style={{
            position: 'sticky',
            top: '1.5rem',
            margin: '0 2rem',
            padding: '0.8rem 1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1000,
            marginTop: '1.5rem'
        }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div style={{
                    background: 'var(--primary)',
                    padding: '0.4rem',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Terminal size={20} color="white" />
                </div>
                <span style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.5px' }} className="gradient-text">
                    XFNX
                </span>
            </Link>

            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <Link to="/" style={{ fontSize: '0.9rem', fontWeight: 500, opacity: 0.8 }}>Home</Link>
                <Link to="/writeups" style={{ fontSize: '0.9rem', fontWeight: 500, opacity: 0.8 }}>Writeups</Link>
                <div style={{ height: '20px', width: '1px', background: 'var(--border)' }}></div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <a href="https://github.com/xfnx-17" target="_blank" rel="noreferrer"><Github size={18} /></a>
                    <a href="https://www.linkedin.com/in/muhammad-afeef-na-eem-mohd-suhaimi/"><Linkedin size={18} /></a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
