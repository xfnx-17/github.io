import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Terminal, Globe, Database, Cpu, Search, ChevronRight } from 'lucide-react';
import { writeups, ctfs } from '../data/writeups';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container" style={{ paddingTop: '5rem' }}>
            {/* Hero Section */}
            <section style={{ textAlign: 'center', marginBottom: '8rem' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="badge">
                        <Shield size={14} /> CTF WRITEUPS
                    </div>

                    <h1 className="hero-title">
                        Decrypting the <br />
                        <span className="gradient-text">Unseen Reality.</span>
                    </h1>

                    <p style={{ maxWidth: '600px', margin: '0 auto 3rem', color: 'var(--text-dim)', fontSize: '1.1rem', padding: '0 1rem' }}>
                        A collection of technical deep-dives and CTF solutions by
                        Xfnx. Building things, breaking things, and learning everything.
                    </p>

                    <div className="hero-buttons">
                        <Link to="/writeups" className="btn-primary">
                            Explore Writeups <ChevronRight size={18} />
                        </Link>
                        <a
                            href="https://github.com/xfnx-17"
                            target="_blank"
                            rel="noreferrer"
                            className="glass btn-secondary"
                        >
                            View Github
                        </a>
                    </div>
                </motion.div>
            </section>

            {/* Challenge Categories Section */}
            <section style={{ marginBottom: '8rem' }}>
                <div className="flex-between">
                    <div>
                        <h2 className="section-title">Challenges</h2>
                        <p style={{ color: 'var(--text-dim)' }}>Browse writeups by category</p>
                    </div>
                    <Link to="/writeups" style={{ color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        View all <ChevronRight size={16} />
                    </Link>
                </div>

                {(() => {
                    const categoryIcons = {
                        'Cryptography': { icon: <Lock size={24} />, desc: 'Ciphers, lattices, number theory and more.' },
                        'Web': { icon: <Globe size={24} />, desc: 'Injections, auth bypasses, and web exploits.' },
                        'Reverse Engineering': { icon: <Cpu size={24} />, desc: 'Binaries, obfuscation, and symbolic execution.' },
                        'Blockchain': { icon: <Database size={24} />, desc: 'Smart contract exploits and on-chain attacks.' },
                        'Pwn': { icon: <Terminal size={24} />, desc: 'Memory corruption and binary exploitation.' },
                        'Misc': { icon: <Search size={24} />, desc: 'Jails, encoding, and everything else.' },
                        'OSINT': { icon: <Search size={24} />, desc: 'Geolocation, recon, and open-source intel.' },
                    };
                    const categories = [...new Set(writeups.map(w => w.category))];
                    return (
                        <div className="cards-grid-small">
                            {categories.map((cat, i) => {
                                const count = writeups.filter(w => w.category === cat).length;
                                const meta = categoryIcons[cat] || { icon: <Search size={24} />, desc: 'Various challenges.' };
                                return (
                                    <motion.div
                                        key={cat}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="glass"
                                        style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
                                    >
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            background: 'rgba(155, 89, 182, 0.1)',
                                            borderRadius: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'var(--primary)'
                                        }}>
                                            {meta.icon}
                                        </div>
                                        <h3 style={{ fontSize: '1.3rem' }}>{cat}</h3>
                                        <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', flexGrow: 1 }}>{meta.desc}</p>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700 }}>
                                            {count} writeup{count !== 1 ? 's' : ''}
                                        </span>
                                        <Link to={`/category/${encodeURIComponent(cat)}`} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            fontWeight: 600,
                                            fontSize: '0.9rem',
                                            color: 'var(--primary)'
                                        }}>
                                            Explore <ChevronRight size={16} />
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    );
                })()}
            </section>
        </div>
    );
};

export default Home;
