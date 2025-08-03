import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";

const API_BASE_URL = "http://62.72.59.3:5056";

const AdminApprovalDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const institutes = ["Institute A", "Institute B", "Institute C"];
  const trainers = ["Trainer X", "Trainer Y", "Trainer Z"];

  // ✅ Fetch all sessions
  const fetchSessions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/sessions`);
      setRequests(response.data || []);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch sessions.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  // ✅ Update session (Institute, Trainer, or Status)
  const updateSession = async (id, field, value) => {
    try {
      const updatedSession = { [field]: value };

      await axios.put(`${API_BASE_URL}/session/${id}`, updatedSession);

      // Update UI immediately
      setRequests((prev) =>
        prev.map((req) =>
          req.id === id ? { ...req, [field]: value } : req
        )
      );
    } catch (err) {
      console.error("Error updating session:", err);
    }
  };

  const handleAction = (id, status) => {
    updateSession(id, "status", status);
  };

  return (
    <div className="min-h-screen bg-[#BFF2FF]">
      <Header />

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Admin Approval Dashboard
        </h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading sessions...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#00A9B9] text-white">
                  <th className="p-3 border">Venue</th>
                  <th className="p-3 border">Training Institute</th>
                  <th className="p-3 border">Trainer</th>
                  <th className="p-3 border">Allotment Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-500">
                      No training requests yet.
                    </td>
                  </tr>
                ) : (
                  requests.map((req) => (
                    <tr key={req.id} className="hover:bg-gray-100">
                      <td className="p-3 border">{req.venue}</td>
                      <td className="p-3 border">
                        <select
                          value={req.institute || ""}
                          onChange={(e) =>
                            updateSession(req.id, "institute", e.target.value)
                          }
                          className="border border-gray-300 rounded px-2 py-1 w-full"
                        >
                          <option value="">Select</option>
                          {institutes.map((inst, i) => (
                            <option key={i} value={inst}>
                              {inst}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-3 border">
                        <select
                          value={req.trainer || ""}
                          onChange={(e) =>
                            updateSession(req.id, "trainer", e.target.value)
                          }
                          className="border border-gray-300 rounded px-2 py-1 w-full"
                        >
                          <option value="">Select</option>
                          {trainers.map((trainer, i) => (
                            <option key={i} value={trainer}>
                              {trainer}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-3 border">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAction(req.id, "Allotted")}
                            className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                          >
                            Allot
                          </button>
                          <button
                            onClick={() => handleAction(req.id, "Rejected")}
                            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                          >
                            Reject
                          </button>
                        </div>
                        <p
                          className={`mt-1 text-sm font-semibold ${
                            req.status === "Pending"
                              ? "text-yellow-600"
                              : req.status === "Allotted"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {req.status || "Pending"}
                        </p>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminApprovalDashboard;
