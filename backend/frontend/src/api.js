const BASE_URL = "https://mernstack-s3ai.onrender.com/api";

/* 🔹 Common fetch wrapper */
const handleResponse = async (res) => {
    let data;

    try {
        data = await res.json();
    } catch {
        throw new Error("Invalid server response");
    }

    if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
};

/* 🔹 Register */
export const registerUser = async (data) => {
    const res = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    return handleResponse(res);
};

/* 🔹 Login */
export const loginUser = async (data) => {
    const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    return handleResponse(res);
};

/* 🔹 Dashboard (Protected) */
export const getDashboard = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/dashboard`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return handleResponse(res);
};