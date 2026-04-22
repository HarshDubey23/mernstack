import { useState } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        course: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await registerUser(form);
        alert(res.message);
        navigate("/");
    };

    return (
        <div className="container">
            <form className="card" onSubmit={handleSubmit}>
                <h2>Register</h2>

                <input name="name" placeholder="Name" onChange={handleChange} required />
                <input name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <input name="course" placeholder="Course" onChange={handleChange} required />

                <button type="submit">Register</button>
                <p onClick={() => navigate("/")}>Already have account? Login</p>
            </form>
        </div>
    );
}