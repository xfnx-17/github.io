import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowLeft, TerminalSquare } from 'lucide-react';
import { writeups, ctfs } from '../data/writeups';

const WriteupsByCategory = () => {
    const { category } = useParams();
    const filteredWriteups = writeups.filter(w => w.category.toLowerCase() === decodeURIComponent(category).toLowerCase());

    return (
        <div className="container" style={{ paddingTop: '5rem' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-dim)', marginBottom: '3rem', fontWeight: 600 }}>
                <ArrowLeft size={18} /> Back to Home
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginBottom: '4rem' }}
            >
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                    <span className="gradient-text">{decodeURIComponent(category)}</span> Challenges
                </h1>
                <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem' }}>
                    {filteredWriteups.length} writeup{filteredWriteups.length !== 1 ? 's' : ''} across all CTF events
                </p>
            </motion.div>

            {filteredWriteups.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="empty-state"
                >
                    <TerminalSquare size={48} />
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-bright)' }}>More challenges brewing...</h3>
                    <p>Check back later for writeups in this category.</p>
                </motion.div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                    {filteredWriteups.map((w, i) => {
                        const ctf = ctfs.find(c => c.id === w.ctfId);
                        return (
                            <motion.div
                                key={w.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass"
                                style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{
                                        padding: '4px 10px',
                                        background: 'rgba(155, 89, 182, 0.1)',
                                        borderRadius: '6px',
                                        fontSize: '0.7rem',
                                        fontWeight: 700,
                                        color: 'var(--text-bright)',
                                    }}>
                                        {ctf?.name}
                                    </span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{w.date}</span>
                                </div>
                                <h3 style={{ fontSize: '1.4rem' }}>{w.title}</h3>
                                <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', flexGrow: 1 }}>{w.summary}</p>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                                    {w.tags.map(tag => (
                                        <span key={tag} style={{ color: 'var(--text-dim)', fontSize: '0.7rem' }}>#{tag}</span>
                                    ))}
                                </div>
                                <Link to={`/writeup/${w.id}`} style={{
                                    marginTop: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontWeight: 600,
                                    fontSize: '0.9rem',
                                    color: 'var(--primary)'
                                }}>
                                    Read More <ChevronRight size={16} />
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default WriteupsByCategory;
