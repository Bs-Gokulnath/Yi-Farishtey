import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";

const API_BASE_URL = "http://62.72.59.3:5056";

const AdminApprovalDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedValues, setSelectedValues] = useState({});
  const [trainersList, setTrainersList] = useState([]);
  const [institutesList, setInstitutesList] = useState([]);
  const [showAddTrainerModal, setShowAddTrainerModal] = useState(false);
  const [showAddInstituteModal, setShowAddInstituteModal] = useState(false);

  const [newTrainerData, setNewTrainerData] = useState({
    name: "",
    email: "",
    phone: "",
    training_institute: "",
    designation: "",
  });

  const [newInstituteData, setNewInstituteData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
  });

  // Fetch sessions
  const fetchSessions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/sessions`);
      setRequests((response.data || []).reverse());
    } catch (err) {
      setError("Failed to fetch sessions.");
    } finally {
      setLoading(false);
    }
  };

  const fetchTrainers = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/trainers`);
      const approvedTrainers = res.data
        .filter((t) => t.status === "approved" || t.status === "active")
        .map((t) => t.name);
      setTrainersList(approvedTrainers);
    } catch (error) {
      console.error("Failed to fetch trainers", error);
    }
  };

  const fetchInstitutes = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/institutes`);
      const approvedInstitutes = res.data
        .filter((i) => i.status === "approved" || i.status === "active")
        .map((i) => i.name);
      setInstitutesList(approvedInstitutes);
    } catch (error) {
      console.error("Failed to fetch institutes", error);
    }
  };

  useEffect(() => {
    fetchTrainers();
    fetchInstitutes();
    fetchSessions();
  }, []);

  const updateSession = async (session_id, field, value) => {
    if (!session_id) return;
    try {
      await axios.put(`${API_BASE_URL}/session/${session_id}`, {
        [field]: value,
      });
      setRequests((prev) =>
        prev.map((req) =>
          req.session_id === session_id ? { ...req, [field]: value } : req
        )
      );
    } catch (err) {
      console.error("Error updating session:", err);
    }
  };

  const approveSession = async (session_id, training_institute, trainer) => {
    if (!session_id || !training_institute || !trainer) {
      alert("Please select both a training institute and a trainer.");
      return;
    }
    try {
      await axios.post(`${API_BASE_URL}/approve-session`, {
        session_id,
        training_institute,
        trainer,
        allotment_status: "approved",
      });
      alert("Session approved successfully!");
      await fetchSessions();
    } catch (err) {
      console.error("Approval failed:", err);
    }
  };

  const rejectSession = async (session_id) => {
    if (!session_id) return;
    try {
      await updateSession(session_id, "allotment_status", "rejected");
    } catch (err) {
      console.error("Reject failed:", err);
    }
  };

  const handleTrainerInputChange = (e) => {
    setNewTrainerData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleInstituteInputChange = (e) => {
    setNewInstituteData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddTrainer = async () => {
    if (!newTrainerData.name.trim() || !newTrainerData.email.trim()) {
      alert("Please fill in at least name and email");
      return;
    }
    try {
      await axios.post(`${API_BASE_URL}/add-trainer`, newTrainerData);
      alert("Trainer added successfully and sent for approval.");
      setShowAddTrainerModal(false);
      setNewTrainerData({
        name: "",
        email: "",
        phone: "",
        training_institute: "",
        designation: "",
      });
      await fetchTrainers();
    } catch (err) {
      console.error("Failed to add trainer", err);
    }
  };

  const handleAddInstitute = async () => {
    if (!newInstituteData.name.trim() || !newInstituteData.email.trim()) {
      alert("Please fill in at least name and email");
      return;
    }
    try {
      await axios.post(`${API_BASE_URL}/add-institute`, newInstituteData);
      alert("Institute added successfully and sent for approval.");
      setShowAddInstituteModal(false);
      setNewInstituteData({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
      });
      await fetchInstitutes();
    } catch (err) {
      console.error("Failed to add institute", err);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-blue-200 via-cyan-100 to-[#c0f8ff]">
      <Header />
      <div className="max-w-7xl mx-auto pt-6 px-2 md:px-6">
        <h1 className="text-2xl font-black mb-6 text-center">Admin Approval Dashboard</h1>
        {loading ? (
          <p className="text-center">Loading sessions...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <div className="overflow-x-auto bg-white/80 rounded-2xl shadow-xl border">
            <table className="w-full text-left min-w-[900px]">
              <thead>
                <tr className="bg-gradient-to-r from-cyan-500 via-blue-600 to-blue-700 text-white">
                  <th className="p-4">Venue</th>
                  <th className="p-4">Institute</th>
                  <th className="p-4">Trainer</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-6 text-center">No training requests yet.</td>
                  </tr>
                ) : (
                  requests.map((req) => (
                    <tr key={req.session_id} className="hover:bg-cyan-50">
                      <td className="p-4">{req.venue || "-"}</td>
                      <td className="p-4">
                        <select
                          value={
                            selectedValues[req.session_id]?.training_institute ||
                            req.training_institute || ""
                          }
                          onChange={(e) => {
                            if (e.target.value === "__add_institute__") {
                              setShowAddInstituteModal(true);
                              return;
                            }
                            setSelectedValues((prev) => ({
                              ...prev,
                              [req.session_id]: {
                                ...prev[req.session_id],
                                training_institute: e.target.value,
                              },
                            }));
                          }}
                          className="w-full border rounded-md px-2 py-1"
                        >
                          <option value="">Select</option>
                          {institutesList.map((inst, idx) => (
                            <option key={idx} value={inst}>{inst}</option>
                          ))}
                          <option value="__add_institute__">➕ Add New Institute...</option>
                        </select>
                      </td>
                      <td className="p-4">
                        <select
                          value={
                            selectedValues[req.session_id]?.trainer ||
                            req.trainer || ""
                          }
                          onChange={(e) => {
                            if (e.target.value === "__add_trainer__") {
                              setShowAddTrainerModal(true);
                              return;
                            }
                            setSelectedValues((prev) => ({
                              ...prev,
                              [req.session_id]: {
                                ...prev[req.session_id],
                                trainer: e.target.value,
                              },
                            }));
                          }}
                          className="w-full border rounded-md px-2 py-1"
                        >
                          <option value="">Select</option>
                          {trainersList.map((trainer, idx) => (
                            <option key={idx} value={trainer}>{trainer}</option>
                          ))}
                          <option value="__add_trainer__">➕ Add New Trainer...</option>
                        </select>
                      </td>
                      <td className="p-4">
                        <span
                          className={`font-bold rounded-full px-3 py-1 block text-center ${
                            req.allotment_status === null
                              ? "text-yellow-700 bg-yellow-100"
                              : req.allotment_status === "approved"
                              ? "text-white bg-green-600"
                              : req.allotment_status === "rejected"
                              ? "text-red-700 bg-red-100"
                              : "text-gray-600"
                          }`}
                        >
                          {req.allotment_status
                            ? req.allotment_status.charAt(0).toUpperCase() + req.allotment_status.slice(1)
                            : "Pending"}
                        </span>
                      </td>
                      <td className="p-4 flex gap-2">
                        <button
                          disabled={
                            (!selectedValues[req.session_id]?.training_institute &&
                              !req.training_institute) ||
                            (!selectedValues[req.session_id]?.trainer && !req.trainer)
                          }
                          onClick={() =>
                            approveSession(
                              req.session_id,
                              selectedValues[req.session_id]?.training_institute || req.training_institute,
                              selectedValues[req.session_id]?.trainer || req.trainer
                            )
                          }
                          className="bg-green-500 text-white px-3 py-1 rounded"
                        >
                          Allot
                        </button>
                        <button
                          onClick={() => rejectSession(req.session_id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Trainer Modal */}
      {showAddTrainerModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            background: "linear-gradient(135deg, #76e5f7cc 0%, #b3ffdb88 50%, #70a1ff99 100%)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="relative w-96 rounded-2xl p-7 bg-white/70 shadow-2xl border">
            <h2 className="text-xl font-bold mb-4 text-center">Add New Trainer</h2>
            {["name", "email", "phone", "training_institute", "designation"].map((field, idx) => (
              <input
                key={idx}
                name={field}
                placeholder={field.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}
                value={newTrainerData[field]}
                onChange={handleTrainerInputChange}
                className="w-full border rounded-md px-3 py-2 mb-2"
              />
            ))}
            <div className="flex justify-end gap-3 mt-3">
              <button onClick={() => setShowAddTrainerModal(false)} className="px-4 py-1 bg-gray-300 rounded">Cancel</button>
              <button onClick={handleAddTrainer} className="px-4 py-1 bg-blue-600 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Institute Modal */}
      {showAddInstituteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            background: "linear-gradient(120deg, #a7ffe8cc 0%, #ccf2ff88 60%, #a59af7bb 100%)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="relative w-96 rounded-2xl p-7 bg-white/75 shadow-2xl border">
            <h2 className="text-xl font-bold mb-4 text-center">Add New Institute</h2>
            {["name", "email", "phone", "address", "city", "state"].map((field, idx) => (
              <input
                key={idx}
                name={field}
                placeholder={field.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}
                value={newInstituteData[field]}
                onChange={handleInstituteInputChange}
                className="w-full border rounded-md px-3 py-2 mb-2"
              />
            ))}
            <div className="flex justify-end gap-3 mt-3">
              <button onClick={() => setShowAddInstituteModal(false)} className="px-4 py-1 bg-gray-300 rounded">Cancel</button>
              <button onClick={handleAddInstitute} className="px-4 py-1 bg-blue-600 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminApprovalDashboard;
