import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";

const CHAPTERS = [
  "Agra", "Ahmedabad", "Ajmer", "Amaravati", "Balasore", "Bengaluru", "Bhopal",
  "Bhavnagar", "Bhubaneswar", "Chandigarh", "Chennai", "Chhatrapati Sambhajinagar",
  "Coimbatore", "Dehradun", "Delhi", "Dindigul", "Durg", "Erode", "Goa", "Gurugram",
  "Guwahati", "Gwalior", "Hosur", "Hubballi", "Hyderabad", "Indore", "Jaipur",
  "Jabalpur", "Jamshedpur", "Kanpur", "Karur", "Kochi", "Kolkata", "Kota", "Kozhikode",
  "Lucknow", "Madurai", "Mangaluru", "Mumbai", "Mysuru", "Nagaland", "Nagpur", "Nashik",
  "Noida", "Puducherry", "Pune", "Raipur", "Rajkot", "Ranchi", "Salem", "Sikkim",
  "Siliguri", "Sivakasi", "Surat", "Thoothukudi", "Tirupur", "Tirupati", "Trichy",
  "Trivandrum", "Vadodara", "Varanasi", "Vellore", "Vizag"
];

const Signup = () => {
  const [email, setEmail] = useState("");
  const [chapter, setChapter] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = "http://62.72.59.3:5056";


  const handleSignup = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!email || !chapter) {
      setError("Please fill all fields.");
      return;
    }

    // ✅ Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      console.log("Sending signup request:", { email, chapter });

      // ✅ Updated API Endpoint
      const response = await axios.post(`${API_BASE_URL}/api/signup`, {
        email,
        chapter,
      });

      console.log("Signup response:", response.data);

      if (response.status === 201 || response.status === 200) {
        alert("Signup successful! You can now sign in.");
        setEmail("");
        setChapter("");
      }
    } catch (err) {
      console.error("Signup error:", err);

      if (err.response) {
        const errorMessage =
          err.response.data?.message || "Signup failed. Please try again.";
        setError(errorMessage);
        console.error("Server error details:", err.response.data);
      } else if (err.request) {
        setError(
          "Unable to connect to server. Please check your internet connection."
        );
        console.error("Network error:", err.request);
      } else {
        setError("An unexpected error occurred. Please try again.");
        console.error("Unexpected error:", err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#BFF2FF] min-h-screen">
      <Header />
      <div className="flex items-center justify-center px-4 py-10 mt-[48px]">
        <form
          onSubmit={handleSignup}
          className="bg-[#85C2FF] shadow-xl p-8 rounded-xl w-full max-w-md space-y-6"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mt-[-20px]">
            Sign Up
          </h2>

          {error && (
            <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <div className="mt-[-20px]">
            <label className="block text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Chapter Name</label>
            <select
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
              required
              disabled={loading}
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50"
            >
              <option value="">Select Chapter</option>
              {CHAPTERS.map((ch) => (
                <option key={ch} value={ch}>
                  {ch}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
