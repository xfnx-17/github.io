import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { writeups, ctfs } from '../data/writeups';

const WriteupsByCTF = () => {
    const { ctfId } = useParams();
    const ctf = ctfs.find(c => c.id === ctfId);
    const filteredWriteups = writeups.filter(w => w.ctfId === ctfId);

    if (!ctf) return <div className="container">CTF not found</div>;

    return (
        <div className="container" style={{ paddingTop: '5rem' }}>
            <Link to="/writeups" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-dim)', marginBottom: '3rem' }}>
                <ArrowLeft size={18} /> Back to CTFs
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginBottom: '4rem' }}
            >
                <h1 className="page-title">{ctf.name} <span className="gradient-text">Writeups</span></h1>
                <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem' }}>
                    {filteredWriteups.length} challenges solved and documented.
                </p>
            </motion.div>

            <div className="cards-grid">
                {filteredWriteups.map((w, i) => (
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
                                background: 'rgba(255,255,255,0.05)',
                                borderRadius: '6px',
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                color: 'var(--primary)',
                                textTransform: 'uppercase'
                            }}>
                                {w.category}
                            </span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{w.date}</span>
                        </div>
                        <h3 style={{ fontSize: '1.4rem' }}>{w.title}</h3>
                        <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', flexGrow: 1 }}>{w.summary}</p>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                            {w.tags.map(tag => (
                                <span key={tag} style={{ color: 'var(--text-dim)', fontSize: '0.7rem' }}>#{tag}</span>
                            ))}
                        </div>
                        <Link to={`/writeup/${w.id}`} style={{
                            marginTop: '1.5rem',
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
                ))}
            </div>
        </div>
    );
};

export default WriteupsByCTF;
