import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";

const API_BASE_URL = "http://62.72.59.3:5056";

const institutes = ["Institute A", "Institute B", "Institute C"];
const trainers = ["Trainer X", "Trainer Y", "Trainer Z"];

const AdminApprovalDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch sessions from API
  const fetchSessions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/sessions`);
      // Assuming response.data is an array of sessions with unique 'id' keys
      const reversedData = (response.data || []).reverse();
      setRequests(reversedData);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch sessions.");
      setLoading(false);
    }
  };

  // Update a session field to local state and backend
  const updateSession = async (id, field, value) => {
    
    if (!id) {
      console.error("updateSession called with missing id");
      return;
    }

    try {
      // Sending PUT request with payload as { field: value }
      await axios.put(`${API_BASE_URL}/session/${id}`, { [field]: value });

      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, [field]: value } : req))
      );
    } catch (err) {
      console.error("Error updating session:", err);
      alert("❌ Failed to update session. Please try again.");
    }
  };

  // Approve a session by sending a POST request and updating status
  const approveSession = async (id, training_institute, trainer) => {
    if (!id || !training_institute || !trainer) {
      alert("Please select both a training institute and trainer before approving.");
      return;
    }

    try {
      const payload = {
        session_id: id,
        training_institute,
        trainer,
      };

      await axios.post(`${API_BASE_URL}/approve-session`, payload);

      alert("✅ Session approved successfully");

      // Update status locally and backend
      await updateSession(id, "status", "Allotted");
    } catch (err) {
      console.error("Approval failed:", err);
      alert("❌ Could not approve session.");
    }
  };

  // Handles Reject action: update status locally and backend
  const handleReject = async (id) => {
    await updateSession(id, "status", "Rejected");
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-200 via-cyan-100 to-[#c0f8ff]">
      {/* Background decorations */}
      <div className="fixed inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-cyan-100 to-[#c0f8ff]" />
        <div className="absolute w-80 h-80 bg-gradient-to-tr from-blue-300/40 via-blue-500/20 to-cyan-200/30 rounded-full blur-3xl left-[-100px] top-[-80px]" />
        <div className="absolute w-72 h-72 bg-indigo-300/20 rounded-full blur-2xl right-[-80px] bottom-[-90px]" />
      </div>

      <Header />

      <div className="max-w-7xl mx-auto pt-6 px-2 md:px-6">
        <h1 className="md:hidden block text-2xl font-black mb-8 text-gray-900 text-center drop-shadow">
          Admin Approval Dashboard
        </h1>

        <div className="flex flex-col md:flex-row items-start">
          <div className="hidden md:flex w-24 justify-center pr-3">
            <span
              className="font-black text-3xl lg:text-2xl text-gray-900"
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                letterSpacing: "0.08em",
                userSelect: "none",
                lineHeight: 1,
                marginBottom: 0,
              }}
            >
              ADMIN APPROVAL DASHBOARD
            </span>
          </div>

          <div className="flex-1 w-full">
            {loading ? (
              <p className="text-center text-gray-700">Loading sessions...</p>
            ) : error ? (
              <p className="text-center text-red-600 font-semibold">{error}</p>
            ) : (
              <div className="overflow-x-auto bg-white/80 backdrop-blur-md shadow-xl rounded-2xl border border-blue-100">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-gradient-to-r from-cyan-500 via-blue-600 to-blue-700 text-white uppercase tracking-wide select-none">
                      <th className="p-4 border border-blue-300 rounded-tl-2xl">Venue</th>
                      <th className="p-4 border border-blue-300">Training Institute</th>
                      <th className="p-4 border border-blue-300">Trainer</th>
                      <th className="p-4 border border-blue-300 rounded-tr-2xl">Allotment Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="p-6 text-center text-gray-500 font-medium">
                          No training requests yet.
                        </td>
                      </tr>
                    ) : (
                      requests.map((req) => (
                        <tr
                          key={req.session_id} // Ensure req.id is unique and defined
                          className="hover:bg-cyan-50 transition-colors duration-150"
                        >
                          <td className="p-4 border border-blue-100 font-semibold text-gray-900">
                            {req.venue || "-"}
                          </td>
                          <td className="p-4 border border-blue-100">
                            <select
                              value={req.training_institute || ""}
                              onChange={(e) =>
                                updateSession(req.id, "training_institute", e.target.value)
                              }
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition"
                            >
                              <option value="">Select</option>
                              {institutes.map((inst, i) => (
                                <option key={i} value={inst}>
                                  {inst}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="p-4 border border-blue-100">
                            <select
                              value={req.trainer || ""}
                              onChange={(e) => updateSession(req.id, "trainer", e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition"
                            >
                              <option value="">Select</option>
                              {trainers.map((trainer, i) => (
                                <option key={i} value={trainer}>
                                  {trainer}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="p-4 border border-blue-100">
                            <div className="flex gap-3 items-center">
                              <button
                                onClick={() => {
                                  if (!req.training_institute || !req.trainer) {
                                    alert(
                                      "Please select both a training institute and trainer before allotting."
                                    );
                                    return;
                                  }
                                  approveSession(req.id, req.training_institute, req.trainer);
                                }}
                                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg py-2 hover:from-green-600 hover:to-green-700 transition font-semibold"
                              >
                                Allot
                              </button>
                              <button
                                onClick={() => handleReject(req.id)}
                                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg py-2 hover:from-red-600 hover:to-red-700 transition font-semibold"
                              >
                                Reject
                              </button>
                            </div>
                            <p
                              className={`mt-2 text-center font-bold ${
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
      </div>
    </div>
  );
};

export default AdminApprovalDashboard;
