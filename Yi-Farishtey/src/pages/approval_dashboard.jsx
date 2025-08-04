// import React, { useEffect, useState } from "react";
// import Header from "../components/Header";
// import axios from "axios";

// const API_BASE_URL = "http://62.72.59.3:5056";

// const AdminApprovalDashboard = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const institutes = ["Institute A", "Institute B", "Institute C"];
//   const trainers = ["Trainer X", "Trainer Y", "Trainer Z"];

//   // ✅ Fetch all sessions
//   const fetchSessions = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${API_BASE_URL}/sessions`);
//       setRequests(response.data || []);
//       setLoading(false);
//     } catch (err) {
//       setError("Failed to fetch sessions.");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSessions();
//   }, []);

//   // ✅ Update session (Institute, Trainer, or Status)
//   const updateSession = async (id, field, value) => {
//     try {
//       const updatedSession = { [field]: value };

//       await axios.put(`${API_BASE_URL}/session/${id}`, updatedSession);

//       // Update UI immediately
//       setRequests((prev) =>
//         prev.map((req) =>
//           req.id === id ? { ...req, [field]: value } : req
//         )
//       );
//     } catch (err) {
//       console.error("Error updating session:", err);
//     }
//   };

//   const handleAction = (id, status) => {
//     updateSession(id, "status", status);
//   };

//   return (
//     <div className="min-h-screen bg-[#BFF2FF]">
//       <Header />

//       <div className="max-w-6xl mx-auto p-6">
//         <h1 className="text-3xl font-bold mb-6 text-gray-800">
//           Admin Approval Dashboard
//         </h1>

//         {loading ? (
//           <p className="text-center text-gray-600">Loading sessions...</p>
//         ) : error ? (
//           <p className="text-center text-red-500">{error}</p>
//         ) : (
//           <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="bg-[#00A9B9] text-white">
//                   <th className="p-3 border">Venue</th>
//                   <th className="p-3 border">Training Institute</th>
//                   <th className="p-3 border">Trainer</th>
//                   <th className="p-3 border">Allotment Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {requests.length === 0 ? (
//                   <tr>
//                     <td colSpan="4" className="p-4 text-center text-gray-500">
//                       No training requests yet.
//                     </td>
//                   </tr>
//                 ) : (
//                   requests.map((req) => (
//                     <tr key={req.id} className="hover:bg-gray-100">
//                       <td className="p-3 border">{req.venue}</td>
//                       <td className="p-3 border">
//                         <select
//                           value={req.institute || ""}
//                           onChange={(e) =>
//                             updateSession(req.id, "institute", e.target.value)
//                           }
//                           className="border border-gray-300 rounded px-2 py-1 w-full"
//                         >
//                           <option value="">Select</option>
//                           {institutes.map((inst, i) => (
//                             <option key={i} value={inst}>
//                               {inst}
//                             </option>
//                           ))}
//                         </select>
//                       </td>
//                       <td className="p-3 border">
//                         <select
//                           value={req.trainer || ""}
//                           onChange={(e) =>
//                             updateSession(req.id, "trainer", e.target.value)
//                           }
//                           className="border border-gray-300 rounded px-2 py-1 w-full"
//                         >
//                           <option value="">Select</option>
//                           {trainers.map((trainer, i) => (
//                             <option key={i} value={trainer}>
//                               {trainer}
//                             </option>
//                           ))}
//                         </select>
//                       </td>
//                       <td className="p-3 border">
//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => handleAction(req.id, "Allotted")}
//                             className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
//                           >
//                             Allot
//                           </button>
//                           <button
//                             onClick={() => handleAction(req.id, "Rejected")}
//                             className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
//                           >
//                             Reject
//                           </button>
//                         </div>
//                         <p
//                           className={`mt-1 text-sm font-semibold ${
//                             req.status === "Pending"
//                               ? "text-yellow-600"
//                               : req.status === "Allotted"
//                               ? "text-green-600"
//                               : "text-red-600"
//                           }`}
//                         >
//                           {req.status || "Pending"}
//                         </p>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminApprovalDashboard;


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

  // Fetch all sessions
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

  // Update session (Institute, Trainer, or Status)
  const updateSession = async (id, field, value) => {
    try {
      const updatedSession = { [field]: value };
      await axios.put(`${API_BASE_URL}/session/${id}`, updatedSession);
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
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-200 via-cyan-100 to-[#c0f8ff]">
      {/* Decorative background shapes */}
      <div
        className="fixed inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-cyan-100 to-[#c0f8ff]" />
        <div className="absolute w-80 h-80 bg-gradient-to-tr from-blue-300/40 via-blue-500/20 to-cyan-200/30 rounded-full blur-3xl left-[-100px] top-[-80px]" />
        <div className="absolute w-72 h-72 bg-indigo-300/20 rounded-full blur-2xl right-[-80px] bottom-[-90px]" />
      </div>

      <Header />

      <div className="max-w-7xl mx-auto pt-6 px-2 md:px-6">
        {/* Mobile horizontal heading */}
        <h1 className="md:hidden block text-2xl font-black mb-8 text-gray-900 text-center drop-shadow">
          Admin Approval Dashboard
        </h1>

        <div className="flex flex-col md:flex-row items-start">
          {/* Vertical title left */}
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

          {/* The Table Card */}
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
                          key={req.id}
                          className="hover:bg-cyan-50 transition-colors duration-150"
                        >
                          <td className="p-4 border border-blue-100 font-semibold text-gray-900">
                            {req.venue || "-"}
                          </td>
                          <td className="p-4 border border-blue-100">
                            <select
                              value={req.institute || ""}
                              onChange={(e) =>
                                updateSession(req.id, "institute", e.target.value)
                              }
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition"
                            >
                              <option value="">Select</option>
                              {["Institute A", "Institute B", "Institute C"].map((inst, i) => (
                                <option key={i} value={inst}>
                                  {inst}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="p-4 border border-blue-100">
                            <select
                              value={req.trainer || ""}
                              onChange={(e) =>
                                updateSession(req.id, "trainer", e.target.value)
                              }
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition"
                            >
                              <option value="">Select</option>
                              {["Trainer X", "Trainer Y", "Trainer Z"].map((trainer, i) => (
                                <option key={i} value={trainer}>
                                  {trainer}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="p-4 border border-blue-100">
                            <div className="flex gap-3 items-center">
                              <button
                                onClick={() => handleAction(req.id, "Allotted")}
                                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg py-2 hover:from-green-600 hover:to-green-700 transition font-semibold"
                              >
                                Allot
                              </button>
                              <button
                                onClick={() => handleAction(req.id, "Rejected")}
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
