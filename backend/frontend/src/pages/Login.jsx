import { useState } from "react";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await loginUser(form);

        if (res.token) {
            localStorage.setItem("token", res.token);
            navigate("/dashboard");
        } else {
            alert(res.message);
        }
    };

    return (
        <div className="container">
            <form className="card" onSubmit={handleSubmit}>
                <h2>Login</h2>

                <input name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />

                <button type="submit">Login</button>
                <p onClick={() => navigate("/register")}>Create new account</p>
            </form>
        </div>
    );
}