import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import WriteupCard from '../components/WriteupCard';
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
                    <WriteupCard key={w.id} writeup={w} index={i} />
                ))}
            </div>
        </div>
    );
};

export default WriteupsByCTF;
