import React, { useState, useContext } from "react";
import { TrainingContext } from "../components/TrainingContext";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookTraining = () => {
  const { addRequest } = useContext(TrainingContext);
  const navigate = useNavigate();

  const API_BASE_URL = "http://62.72.59.3:5056";

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    venue: "",
    no_of_participants: "",
    chapter: "",
    requested_date: "",
    time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "participants") {
      setFormData({ ...formData, no_of_participants: value });
    } else if (name === "date") {
      setFormData({ ...formData, requested_date: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const isFormValid = Object.values(formData).every((field) => field !== "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      toast.error("Please fill in all fields.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/create-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("✅ Session Created:", result);

        addRequest(result);
        toast.success("Request Submitted Successfully!", {
          position: "top-right",
          autoClose: 3000,
        });

        setTimeout(() => navigate("/approval"), 1500);
      } else {
        const errorData = await response.json();
        console.error("❌ API Error:", errorData);
        toast.error("Failed to submit request. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      toast.error("Error submitting request. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#BFF2FF] flex flex-col">
      <Header />

      <main className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Book Training</h1>

        <div className="bg-[#85C2FF] shadow-lg rounded-2xl p-8 w-full max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LEFT COLUMN */}
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full border border-gray-700 rounded-lg px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Number:
                </label>
                <input
                  type="text"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  placeholder="Enter your contact number"
                  className="w-full border border-gray-700 rounded-lg px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full border border-gray-700 rounded-lg px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Venue:
                </label>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  placeholder="Enter venue"
                  className="w-full border border-gray-700 rounded-lg px-3 py-2"
                  required
                />
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  No. of Participants:
                </label>
                <input
                  type="number"
                  name="participants"
                  value={formData.no_of_participants}
                  onChange={handleChange}
                  placeholder="Enter number of participants"
                  className="w-full border border-gray-700 rounded-lg px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Chapter:
                </label>
                <input
                  type="text"
                  name="chapter"
                  value={formData.chapter}
                  onChange={handleChange}
                  placeholder="Enter chapter name"
                  className="w-full border border-gray-700 rounded-lg px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Requested Date:
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.requested_date}
                  onChange={handleChange}
                  className="w-full border border-gray-700 rounded-lg px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Time:
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full border border-gray-700 rounded-lg px-3 py-2"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`w-full font-bold py-3 rounded-lg transition ${
                isFormValid
                  ? "bg-[#00A9B9] text-white hover:bg-[#008b99]"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              Submit
            </button>
          </div>
        </div>

        <ToastContainer />
      </main>
    </div>
  );
};

export default BookTraining;
