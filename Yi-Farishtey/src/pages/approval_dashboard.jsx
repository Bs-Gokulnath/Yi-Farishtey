// import React, { useState } from "react";
// import Header from "../components/Header";

// const AdminApprovalDashboard = () => {
//   // Sample data (later fetch from backend)
//   const [requests, setRequests] = useState([
//     { id: 1, venue: "Chennai", institute: "", trainer: "", status: "" },
//     { id: 2, venue: "Bangalore", institute: "", trainer: "", status: "" },
//     { id: 3, venue: "Delhi", institute: "", trainer: "", status: "" },
//   ]);

//   const institutes = ["Institute A", "Institute B", "Institute C"];
//   const trainers = ["Trainer X", "Trainer Y", "Trainer Z"];

//   const handleChange = (id, field, value) => {
//     setRequests((prev) =>
//       prev.map((req) =>
//         req.id === id ? { ...req, [field]: value } : req
//       )
//     );
//   };

//   const handleAction = (id, action) => {
//     setRequests((prev) =>
//       prev.map((req) =>
//         req.id === id ? { ...req, status: action } : req
//       )
//     );
//   };

//   return (
//     <div className="min-h-screen bg-[#BFF2FF]">
//       <Header />

//       <div className="max-w-6xl mx-auto p-6">
//         <h1 className="text-3xl font-bold mb-6 text-gray-800">
//           Admin Approval Dashboard
//         </h1>

//         <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="bg-[#00A9B9] text-white">
//                 <th className="p-3 border">Venue</th>
//                 <th className="p-3 border">Training Institute</th>
//                 <th className="p-3 border">Trainer</th>
//                 <th className="p-3 border">Allotment Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {requests.map((req) => (
//                 <tr key={req.id} className="hover:bg-gray-100">
//                   {/* Venue */}
//                   <td className="p-3 border">{req.venue}</td>

//                   {/* Training Institute Dropdown */}
//                   <td className="p-3 border">
//                     <select
//                       value={req.institute}
//                       onChange={(e) =>
//                         handleChange(req.id, "institute", e.target.value)
//                       }
//                       className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-[#00A9B9]"
//                     >
//                       <option value="">Select</option>
//                       {institutes.map((inst, i) => (
//                         <option key={i} value={inst}>
//                           {inst}
//                         </option>
//                       ))}
//                     </select>
//                   </td>

//                   {/* Trainer Dropdown */}
//                   <td className="p-3 border">
//                     <select
//                       value={req.trainer}
//                       onChange={(e) =>
//                         handleChange(req.id, "trainer", e.target.value)
//                       }
//                       className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-[#00A9B9]"
//                     >
//                       <option value="">Select</option>
//                       {trainers.map((trainer, i) => (
//                         <option key={i} value={trainer}>
//                           {trainer}
//                         </option>
//                       ))}
//                     </select>
//                   </td>

//                   {/* Allot / Reject Buttons */}
//                   <td className="p-3 border">
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => handleAction(req.id, "Allotted")}
//                         className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition"
//                       >
//                         Allot
//                       </button>
//                       <button
//                         onClick={() => handleAction(req.id, "Rejected")}
//                         className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
//                       >
//                         Reject
//                       </button>
//                     </div>
//                     {req.status && (
//                       <p
//                         className={`mt-1 text-sm font-semibold ${
//                           req.status === "Allotted"
//                             ? "text-green-600"
//                             : "text-red-600"
//                         }`}
//                       >
//                         {req.status}
//                       </p>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminApprovalDashboard;


import React, { useContext } from "react";
import { TrainingContext } from "../components/TrainingContext";
import Header from "../components/Header";

const AdminApprovalDashboard = () => {
  const { requests, updateRequest } = useContext(TrainingContext);

  const institutes = ["Institute A", "Institute B", "Institute C"];
  const trainers = ["Trainer X", "Trainer Y", "Trainer Z"];

  const handleChange = (id, field, value) => {
    updateRequest(id, { [field]: value });
  };

  const handleAction = (id, status) => {
    updateRequest(id, { status });
  };

  return (
    <div className="min-h-screen bg-[#BFF2FF]">
      <Header />

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Admin Approval Dashboard
        </h1>

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
                          handleChange(req.id, "institute", e.target.value)
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
                          handleChange(req.id, "trainer", e.target.value)
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
                        {req.status}
                      </p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminApprovalDashboard;
