import React, { useState, useEffect } from 'react';
import { Api } from '../services/api';
import '../index.css';

const UrlShortener = () => {
    const [formData, setFormData] = useState({ originalUrl: '' });
    const [shortUrl, setShortUrl] = useState('');
    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUrls();
    }, []);

    const fetchUrls = async () => {
        try {
            const res = await Api.get("/url/all");
            setUrls(res.data);
        } catch (error) {
            console.log("Error fetching urls:", error);
        }
    };

    const deleteHandler = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await Api.delete(`/url/delete/${id}`);
            fetchUrls();
        } catch (error) {
            console.log(error);
        }
    };

    const inputHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!formData.originalUrl) return;

        setLoading(true);
        try {
            const res = await Api.post("/url/create", formData);
            setShortUrl("http://localhost:3000/url/" + res.data.shortId);
            setFormData({ originalUrl: '' });
            fetchUrls();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main-layout">
            {/* Background Particles */}
            <div className="particles-container">
                {[...Array(35)].map((_, i) => {
                    const colors = ['#22d3ee', '#c084fc', '#f472b6', '#4ade80', '#fbbf24'];
                    const tags = ['HTTP', 'HTTPS', 'WWW', 'URL', '/', '://', '.COM', '#', 'LINK', 'GET'];
                    const color = colors[Math.floor(Math.random() * colors.length)];
                    const tag = tags[Math.floor(Math.random() * tags.length)];
                    return (
                        <div key={i} className="particle" style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 8}s`,
                            fontSize: `${Math.random() * 12 + 10}px`,
                            color: color,
                            textShadow: `0 0 10px ${color}88`,
                            fontWeight: 'bold',
                            opacity: Math.random() * 0.4 + 0.1,
                        }}>
                            {tag}
                        </div>
                    );
                })}
            </div>

            {/* Navbar */}
            <nav className="navbar">
                <div className="logo">
                    <div className="logo-icon">S</div>
                    <span>SHORT URL</span>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="badge">Free URL Shortener with Analytics</div>
                
                <h1 className="hero-title">
                    Shorten URLs.
                    <span>Track Every Click.</span>
                </h1>
                
                <p className="hero-subtitle">
                    Transform long, messy URLs into clean, branded short links. Track clicks, 
                    measure performance, and share confidently anywhere.
                </p>

                <form onSubmit={submitHandler} className="pill-form-container">
                    <div className="input-wrapper">
                        <span className="input-icon">🔗</span>
                        <input
                            type="url"
                            className="pill-input"
                            placeholder="Paste your long URL to shorten..."
                            name="originalUrl"
                            value={formData.originalUrl}
                            onChange={inputHandler}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-shorten" disabled={loading}>
                        {loading ? '...' : (
                            <>
                                Shorten URL <span style={{fontSize: '1.2rem'}}>→</span>
                            </>
                        )}
                    </button>
                </form>

                <ul className="features-list">
                    <li className="feature-item"><span className="check-icon">✓</span> Free forever</li>
                    <li className="feature-item"><span className="check-icon">✓</span> Full click analytics</li>
                    <li className="feature-item"><span className="check-icon">✓</span> Custom short links</li>
                </ul>

                {shortUrl && (
                    <div className="success-msg">
                        <div style={{fontWeight: 600, marginBottom: '0.5rem'}}>Success! Your short link:</div>
                        <a href={shortUrl} target="_blank" rel="noreferrer" className="short-link" style={{fontSize: '1.2rem'}}>
                            {shortUrl}
                        </a>
                    </div>
                )}
            </section>

            {/* History Table */}
            <section className="history-section">
                <h2 className="history-title">Recent Activity</h2>
                <div style={{overflowX: 'auto'}}>
                    <table className="url-table">
                        <thead>
                            <tr>
                                <th>Original URL</th>
                                <th>Short Link</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {urls.length > 0 ? urls.map((url) => (
                                <tr key={url._id}>
                                    <td>
                                        <div className="original-url" title={url.originalUrl}>
                                            {url.originalUrl}
                                        </div>
                                    </td>
                                    <td>
                                        <a href={`http://localhost:3000/url/${url.shortId}`} target="_blank" rel="noreferrer" className="short-link">
                                            {url.shortId}
                                        </a>
                                    </td>
                                    <td>
                                        <button className="btn-delete-small" onClick={() => deleteHandler(url._id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="3" style={{textAlign: 'center', color: '#64748b'}}>
                                        No links shortened yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default UrlShortener;
