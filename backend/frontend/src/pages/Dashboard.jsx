import { useEffect, useState } from "react";
import { getDashboard } from "../api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const res = await getDashboard();
            if (res.student) {
                setUser(res.student);
            } else {
                navigate("/");
            }
        };
        fetchData();
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="container">
            <div className="card">
                <h2>Dashboard</h2>

                {user && (
                    <>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Course:</strong> {user.course}</p>
                    </>
                )}

                <button onClick={logout}>Logout</button>
            </div>
        </div>
    );
}