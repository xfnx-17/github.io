import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, TerminalSquare } from 'lucide-react';
import WriteupCard from '../components/WriteupCard';
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
                <h1 className="page-title">
                    <span className="gradient-text">{decodeURIComponent(category)}</span> Challenges
                </h1>
                <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem' }}>
                    {filteredWriteups.length} writeup{filteredWriteups.length === 1 ? '' : 's'} across all CTF events
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
                <div className="cards-grid">
                    {filteredWriteups.map((w, i) => {
                        const ctf = ctfs.find(c => c.id === w.ctfId);
                        return <WriteupCard key={w.id} writeup={w} index={i} badgeText={ctf?.name} />;
                    })}
                </div>
            )}
        </div>
    );
};

export default WriteupsByCategory;
