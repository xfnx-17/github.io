import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, ChevronRight, Calendar, ArrowLeft } from 'lucide-react';
import { ctfs } from '../data/writeups';
import { Link } from 'react-router-dom';

const CTFList = () => {
    return (
        <div className="container" style={{ paddingTop: '5rem' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginBottom: '4rem' }}
            >
                <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-dim)', fontSize: '0.9rem', marginBottom: '2rem', fontWeight: 600 }}>
                    <ArrowLeft size={16} /> Back to Home
                </Link>
                <h1 className="page-title">CTF <span className="gradient-text">Events</span></h1>
                <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem' }}>
                    Select a CTF to explore the challenges and my solutions.
                </p>
            </motion.div>

            <div className="cards-grid-large">
                {ctfs.map((ctf, i) => (
                    <motion.div
                        key={ctf.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="glass"
                        style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem', cursor: 'pointer' }}
                    >
                        <div style={{
                            width: '48px',
                            height: '48px',
                            background: 'rgba(155, 89, 182, 0.1)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--primary)',
                            marginBottom: '0.5rem'
                        }}>
                            {ctf.icon === 'Shield' ? <Shield size={24} /> : <Target size={24} />}
                        </div>

                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-dim)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                                <Calendar size={14} /> {ctf.date}
                            </div>
                            <h2 style={{ fontSize: '1.6rem', marginBottom: '0.8rem' }}>{ctf.name}</h2>
                            <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: 1.5 }}>{ctf.summary}</p>
                        </div>

                        <Link to={`/ctf/${ctf.id}`} className="btn-primary" style={{ marginTop: '1rem', justifyContent: 'center' }}>
                            View Writeups <ChevronRight size={18} />
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default CTFList;
