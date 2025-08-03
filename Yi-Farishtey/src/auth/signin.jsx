import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [step, setStep] = useState("email");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const API_BASE_URL = "http://62.72.59.3:5056";

  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (!/^[0-9]?$/.test(value)) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // ✅ Send OTP API
  const sendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      console.log("Sending OTP request:", { email });
      const response = await axios.post(`${API_BASE_URL}/send-otp`, { email });
      console.log("OTP response:", response.data);
      setStep("otp");
      alert("OTP sent to your email.");
    } catch (err) {
      console.error("Send OTP error:", err);
      if (err.response) {
        // Handle array of error details
        let errorMessage = "Failed to send OTP";
        console.log("Full error response:", JSON.stringify(err.response.data, null, 2));
        
        if (err.response.data?.detail) {
          if (Array.isArray(err.response.data.detail)) {
            const firstError = err.response.data.detail[0];
            if (typeof firstError === 'object' && firstError.msg) {
              errorMessage = firstError.msg;
            } else if (typeof firstError === 'string') {
              errorMessage = firstError;
            } else {
              errorMessage = "Email not found or invalid";
            }
          } else if (typeof err.response.data.detail === 'string') {
            errorMessage = err.response.data.detail;
          }
        } else if (err.response.data?.message) {
          errorMessage = err.response.data.message;
        }
        
        setError(String(errorMessage)); // Ensure it's a string
        console.error("Server error details:", err.response.data);
      } else {
        setError("Failed to send OTP. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Verify OTP API
  const verifyOtpAndSignin = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      setError("Enter the complete 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      console.log("Verifying OTP:", { email, otp: enteredOtp });
      const response = await axios.post(`${API_BASE_URL}/signin`, {
        email,
        otp: enteredOtp,
      });
      
      console.log("Signin response:", response.data);
      
      if (response.status === 200 || response.status === 201) {
        alert("Signin successful!");
        // Store user data if provided
        if (response.data.user_id) {
          localStorage.setItem("user", JSON.stringify({
            email: email,
            user_id: response.data.user_id
          }));
        }
        navigate("/book-training");
      }
    } catch (err) {
      console.error("Signin error:", err);
      if (err.response) {
        // Handle array of error details
        let errorMessage = "Signin failed";
        if (err.response.data?.detail) {
          if (Array.isArray(err.response.data.detail)) {
            errorMessage = err.response.data.detail[0]?.msg || err.response.data.detail[0] || "Signin failed";
          } else {
            errorMessage = err.response.data.detail;
          }
        } else if (err.response.data?.message) {
          errorMessage = err.response.data.message;
        }
        setError(String(errorMessage)); // Ensure it's a string
        console.error("Server error details:", err.response.data);
      } else {
        setError("Signin failed. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#BFF2FF] flex flex-col">
      <Header />
      <div className="flex flex-grow items-center justify-center px-4 py-10">
        <form
          onSubmit={step === "email" ? sendOtp : verifyOtpAndSignin}
          className="bg-[#85C2FF] shadow-xl p-8 rounded-xl w-full max-w-md space-y-6"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800">Sign In</h2>
          {error && (
            <div className="text-red-500 text-center bg-red-50 p-2 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          {step === "email" && (
            <div>
              <label className="block mb-1">Email Address</label>
              <input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-3 rounded-lg"
                disabled={loading}
              />
            </div>
          )}

          {step === "otp" && (
            <div>
              <label className="block mb-2">Enter 6-Digit OTP</label>
              <div className="flex justify-between space-x-1">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(e, index)}
                    ref={(el) => (inputsRef.current[index] = el)}
                    className="w-12 h-12 text-center border rounded-lg text-lg focus:ring-2 focus:ring-purple-500"
                  />
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Please wait..." : step === "email" ? "Send OTP" : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
