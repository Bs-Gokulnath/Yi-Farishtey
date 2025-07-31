import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", ""]);
  const [step, setStep] = useState("email");
  const [error, setError] = useState("");
  const inputsRef = useRef([]);
  const navigate = useNavigate();

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

  const sendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email.");
      return;
    }
    setError("");
    try {
      await axios.post("http://localhost:5000/api/signin/send-otp", { email });
      setStep("otp");
      alert("OTP sent to your email.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const verifyOtpAndSignin = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    try {
      const response = await axios.post("http://localhost:5000/api/signin", {
        email,
        otp: enteredOtp
      });
      if (response.data.success) {
        alert("Signin successful!");
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/analyze");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signin failed");
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
          {error && <div className="text-red-500 text-center">{error}</div>}

          {step === "email" && (
            <div>
              <label className="block mb-1">Email Address</label>
              <input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-3 rounded-lg"
              />
            </div>
          )}

          {step === "otp" && (
            <div>
              <label className="block mb-2">Enter 3-Digit OTP</label>
              <div className="flex justify-between space-x-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(e, index)}
                    ref={(el) => (inputsRef.current[index] = el)}
                    className="w-14 h-14 text-center border rounded-lg text-xl"
                  />
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg"
          >
            {step === "email" ? "Send OTP" : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;