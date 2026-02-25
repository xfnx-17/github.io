import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag, Clock } from 'lucide-react';
import { writeups, ctfs } from '../data/writeups';

const WriteupDetail = () => {
    const { id } = useParams();
    const writeup = writeups.find(w => w.id === id);
    const ctf = writeup ? ctfs.find(c => c.id === writeup.ctfId) : null;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!writeup) {
        return (
            <div className="container" style={{ paddingTop: '10rem', textAlign: 'center' }}>
                <h2>Writeup not found</h2>
                <Link to="/" style={{ color: 'var(--primary)' }}>Go back home</Link>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container"
            style={{ paddingTop: '5rem', paddingBottom: '10rem' }}
        >
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-dim)', marginBottom: '3rem' }}>
                <ArrowLeft size={18} /> Back to explore
            </Link>

            <header style={{ marginBottom: '4rem' }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>
                        {writeup.category}
                    </span>
                    {ctf && (
                        <>
                            <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>•</span>
                            <span style={{ color: 'var(--primary-dim)', fontWeight: 600, fontSize: '0.8rem', background: 'rgba(var(--primary-rgb), 0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                                {ctf.name}
                            </span>
                        </>
                    )}
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>•</span>
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={14} /> {writeup.date}
                    </span>
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>•</span>
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={14} /> 10 min read
                    </span>
                </div>

                <h1 style={{ fontSize: '3.5rem', marginBottom: '2rem' }}>{writeup.title}</h1>

                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                    {writeup.tags?.map(tag => (
                        <span key={tag} className="glass" style={{ padding: '6px 14px', borderRadius: '100px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Tag size={12} /> {tag}
                        </span>
                    ))}
                </div>
            </header>

            <div className="glass markdown-container" style={{ padding: '4rem', background: 'rgba(20, 20, 23, 0.4)' }}>
                <style>{`
          .markdown-container h1 { margin: 2rem 0 1rem; font-size: 2.5rem; }
          .markdown-container h2 { margin: 2rem 0 1rem; font-size: 1.8rem; color: var(--primary); }
          .markdown-container p { margin-bottom: 1.5rem; color: var(--text-main); font-size: 1.1rem; line-height: 1.8; }
          .markdown-container code { background: rgba(255,255,255,0.05); padding: 0.2rem 0.4rem; border-radius: 4px; font-family: 'Fira Code', monospace; font-size: 0.9rem; }
          /* .markdown-container pre { background: #1a1a1e; padding: 2rem; border-radius: 12px; margin: 2rem 0; overflow-x: auto; border: 1px solid var(--border); } */
          /* .markdown-container pre code { background: none; padding: 0; } */
          .markdown-container ul { margin-bottom: 1.5rem; padding-left: 1.5rem; list-style: disc; }
          .markdown-container li { margin-bottom: 0.5rem; color: var(--text-main); }
        `}</style>
                <ReactMarkdown
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline && match ? (
                                <SyntaxHighlighter
                                    style={vscDarkPlus}
                                    language={match[1]}
                                    PreTag="div"
                                    customStyle={{ margin: '2rem 0', borderRadius: '12px', padding: '2rem', background: '#1a1a1e', border: '1px solid var(--border)' }}
                                    {...props}
                                >
                                    {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                            ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            );
                        }
                    }}
                >
                    {writeup.content}
                </ReactMarkdown>
            </div>
        </motion.div>
    );
};

export default WriteupDetail;
