import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

const API_BASE_URL = "http://62.72.59.3:5056";

const MyTrainingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userEmail = localStorage.getItem("userEmail"); // 👈 Store this at login

  useEffect(() => {
    const fetchMyRequests = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/sessions?email=${userEmail}`);
        const reversed = res.data.reverse(); // Latest first
        setRequests(reversed);
      } catch (err) {
        console.error(err);
        setError("Unable to fetch your training requests.");
      } finally {
        setLoading(false);
      }
    };
    fetchMyRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-100 to-[#c0f8ff] p-6">
      <Header />

      <div className="max-w-5xl mx-auto mt-12">
        <h2 className="text-3xl font-black text-gray-800 mb-6 text-center">
          My Training Requests
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600 font-semibold">{error}</p>
        ) : requests.length === 0 ? (
          <p className="text-center text-gray-600 font-medium">
            No requests found.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {requests.map((req) => (
              <div
                key={req.id}
                className="bg-white shadow-md rounded-xl p-5 border border-blue-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{req.venue}</h3>
                <p><strong>Date:</strong> {req.requested_date}</p>
                <p><strong>Time:</strong> {req.time}</p>
                <p><strong>Participants:</strong> {req.no_of_participants}</p>
                <p><strong>Chapter:</strong> {req.chapter}</p>

                <div className="mt-4">
                  <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                    req.status === "Allotted"
                      ? "bg-green-100 text-green-700"
                      : req.status === "Rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    Status: {req.status || "Pending"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTrainingRequests;
