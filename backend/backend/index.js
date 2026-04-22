const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

/* ===========================
   MongoDB Connection
=========================== */
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

/* ===========================
   Student Schema
=========================== */
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    course: { type: String, required: true }
}, { timestamps: true });

const Student = mongoose.model("Student", studentSchema);

/* ===========================
   Auth Middleware
=========================== */
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" });
        }

        // 🔥 FIX: remove "Bearer "
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Token format invalid" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

/* ===========================
   Routes
=========================== */

/* 🔹 Register */
app.post("/api/register", async (req, res) => {
    try {
        const { name, email, password, course } = req.body;

        const existing = await Student.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const student = new Student({
            name,
            email,
            password: hashedPassword,
            course
        });

        await student.save();

        res.json({ message: "Registration successful" });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

/* 🔹 Login */
app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(400).json({ message: "Invalid email" });
        }

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: student._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({ token, message: "Login successful" });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

/* 🔹 Update Password */
app.put("/api/update-password", authMiddleware, async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const student = await Student.findById(req.user.id);

        const isMatch = await bcrypt.compare(oldPassword, student.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Old password incorrect" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        student.password = hashedPassword;

        await student.save();

        res.json({ message: "Password updated successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

/* 🔹 Update Course */
app.put("/api/update-course", authMiddleware, async (req, res) => {
    try {
        const { course } = req.body;

        const student = await Student.findByIdAndUpdate(
            req.user.id,
            { course },
            { new: true }
        );

        res.json({ message: "Course updated", student });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

/* 🔹 Protected Dashboard */
app.get("/api/dashboard", authMiddleware, async (req, res) => {
    try {
        const student = await Student.findById(req.user.id).select("-password");
        res.json({ message: "Welcome to dashboard", student });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

/* ===========================
   Server Start
=========================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});