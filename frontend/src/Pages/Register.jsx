import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import Scene3D from '../Components/Scene3D';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', course: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await api.post('/register', formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Scene3D />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%' }}>
            <div className="glass-card" style={{ width: '400px' }}>
                <h2 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>Join the Universe</h2>
                <p style={{ textAlign: 'center', opacity: 0.7, marginBottom: '2rem' }}>Create your avatar and start your journey.</p>
                
                {error && <p style={{ color: '#ff4d4d', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}
                
                <form onSubmit={handleSubmit}>
                    <input name="name" placeholder="Full Name" onChange={handleChange} required />
                    <input name="email" type="email" placeholder="Email Address" onChange={handleChange} required />
                    <input name="course" placeholder="Course / Role" onChange={handleChange} required />
                    <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
                    <button type="submit" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
                        {loading ? 'Creating Account...' : 'Register'}
                    </button>
                </form>
                
                <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem' }}>
                    Already a member? <Link to="/login" style={{ color: '#818cf8', textDecoration: 'none' }}>Log in</Link>
                </p>
            </div>
        </>
    );
};

export default Register;
