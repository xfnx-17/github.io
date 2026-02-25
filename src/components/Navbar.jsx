import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Github, Linkedin, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    return (
        <nav className="glass navbar">
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }} onClick={() => setIsMenuOpen(false)}>
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

            {/* Desktop Navigation */}
            <div className="desktop-nav">
                <Link to="/" style={{ fontSize: '0.9rem', fontWeight: 500, opacity: 0.8 }}>Home</Link>
                <Link to="/writeups" style={{ fontSize: '0.9rem', fontWeight: 500, opacity: 0.8 }}>Writeups</Link>
                <div style={{ height: '20px', width: '1px', background: 'var(--border)' }}></div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <a href="https://github.com/xfnx-17" target="_blank" rel="noreferrer"><Github size={18} /></a>
                    <a href="https://www.linkedin.com/in/muhammad-afeef-na-eem-mohd-suhaimi/" target="_blank" rel="noreferrer"><Linkedin size={18} /></a>
                </div>
            </div>

            {/* Mobile Toggle */}
            <button className="mobile-nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ color: 'var(--text-main)', display: 'flex' }}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Navigation Dropdown */}
            {isMenuOpen && (
                <div className="mobile-menu">
                    <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link to="/writeups" onClick={() => setIsMenuOpen(false)}>Writeups</Link>
                    <div style={{ height: '1px', width: '100%', background: 'var(--border)', margin: '0.5rem 0' }}></div>
                    <div style={{ display: 'flex', gap: '1rem', padding: '0.5rem' }}>
                        <a href="https://github.com/xfnx-17" target="_blank" rel="noreferrer" onClick={() => setIsMenuOpen(false)}><Github size={20} /></a>
                        <a href="https://www.linkedin.com/in/muhammad-afeef-na-eem-mohd-suhaimi/" target="_blank" rel="noreferrer" onClick={() => setIsMenuOpen(false)}><Linkedin size={20} /></a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
