import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import PropTypes from 'prop-types';

const WriteupCard = ({ writeup, badgeText, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass"
            style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                    padding: '4px 10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '6px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: 'var(--primary)',
                    textTransform: 'uppercase'
                }}>
                    {badgeText || writeup.category}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{writeup.date}</span>
            </div>
            <h3 style={{ fontSize: '1.4rem' }}>{writeup.title}</h3>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', flexGrow: 1 }}>{writeup.summary}</p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                {writeup.tags.map(tag => (
                    <span key={tag} style={{ color: 'var(--text-dim)', fontSize: '0.7rem' }}>#{tag}</span>
                ))}
            </div>
            <Link to={`/writeup/${writeup.id}`} style={{
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
    );
};

WriteupCard.propTypes = {
    writeup: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        summary: PropTypes.string.isRequired,
        category: PropTypes.string,
        date: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string)
    }).isRequired,
    badgeText: PropTypes.string,
    index: PropTypes.number.isRequired
};

export default WriteupCard;
