import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await api.get('/dashboard');
                setUser(res.data.user);
            } catch (err) {
                console.error(err);
                handleLogout();
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%' }}>
            <h2 className="gradient-text">Loading Portal...</h2>
        </div>
    );

    return (
        <div style={{ padding: '40px', minHeight: '100vh', width: '100%' }}>
            <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <h1 className="gradient-text" style={{ fontSize: '2rem' }}>BoardGame Universe</h1>
                <button onClick={handleLogout} style={{ background: 'rgba(255, 77, 77, 0.2)', border: '1px solid rgba(255, 77, 77, 0.3)', color: '#ff4d4d' }}>
                    Logout
                </button>
            </nav>

            <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(45deg, #6366f1, #c084fc)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2rem', fontWeight: '800' }}>
                        {user?.name?.charAt(0)}
                    </div>
                    <div>
                        <h2 style={{ margin: 0 }}>Welcome back, {user?.name}</h2>
                        <p style={{ opacity: 0.6, margin: 0 }}>{user?.email}</p>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                    <div style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <h3 style={{ margin: '0 0 10px 0', fontSize: '1rem', opacity: 0.7 }}>Current Course</h3>
                        <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600' }}>{user?.course}</p>
                    </div>
                    <div style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <h3 style={{ margin: '0 0 10px 0', fontSize: '1rem', opacity: 0.7 }}>Level</h3>
                        <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600' }}>Explorer [Lvl 1]</p>
                    </div>
                    <div style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <h3 style={{ margin: '0 0 10px 0', fontSize: '1rem', opacity: 0.7 }}>World Status</h3>
                        <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600', color: '#10b981' }}>Online</p>
                    </div>
                </div>

                <div style={{ marginTop: '40px', padding: '40px', textAlign: 'center', border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '24px' }}>
                    <h3 className="gradient-text">3D World Coming Soon</h3>
                    <p style={{ opacity: 0.6 }}>Our engine is initializing the 3D board game universe. Stay tuned for an immersive experience.</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
