import React, { useState, useEffect } from 'react';
import { Api } from '../services/api';
import '../index.css';

const UrlShortener = () => {
    const [formData, setFormData] = useState({ originalUrl: '' });
    const [shortUrl, setShortUrl] = useState('');
    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(false);

    const BASE_URL = import.meta.env.VITE_BASE_URL || window.location.origin;

    useEffect(() => {
        fetchUrls();
    }, []);

    const fetchUrls = async () => {
        try {
            const res = await Api.get("/url/all");

            console.log("API Response:", res.data);

            // FIX: ensure array
            const urlData = Array.isArray(res.data)
                ? res.data
                : res.data.data || [];

            setUrls(urlData);

        } catch (error) {
            console.log("Error fetching urls:", error);
            setUrls([]);
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

            setShortUrl(`${BASE_URL}/url/${res.data.shortId}`);

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

            {/* Navbar */}
            <nav className="navbar">
                <div className="logo">
                    <div className="logo-icon">S</div>
                    <span>SHORT URL</span>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero-section">
                <h1 className="hero-title">
                    Shorten URLs.
                    <span> Track Every Click.</span>
                </h1>

                <form onSubmit={submitHandler} className="pill-form-container">
                    <input
                        type="url"
                        className="pill-input"
                        placeholder="Paste your long URL..."
                        name="originalUrl"
                        value={formData.originalUrl}
                        onChange={inputHandler}
                        required
                    />

                    <button type="submit" className="btn-shorten" disabled={loading}>
                        {loading ? 'Loading...' : 'Shorten'}
                    </button>
                </form>

                {shortUrl && (
                    <div className="success-msg">
                        <p>Short URL:</p>
                        <a href={shortUrl} target="_blank" rel="noreferrer">
                            {shortUrl}
                        </a>
                    </div>
                )}
            </section>

            {/* Table */}
            <section className="history-section">
                <h2>Recent URLs</h2>

                <table className="url-table">
                    <thead>
                        <tr>
                            <th>Original URL</th>
                            <th>Short Link</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {Array.isArray(urls) && urls.length > 0 ? (
                            urls.map((url) => (
                                <tr key={url._id}>
                                    <td>{url.originalUrl}</td>

                                    <td>
                                        <a
                                            href={`${BASE_URL}/url/${url.shortId}`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {url.shortId}
                                        </a>
                                    </td>

                                    <td>
                                        <button
                                            onClick={() => deleteHandler(url._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">No URLs found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default UrlShortener;