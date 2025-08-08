// import React, { useState, useContext } from "react";
// import { TrainingContext } from "../components/TrainingContext";
// import Header from "../components/Header";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const BookTraining = () => {
//   const { addRequest } = useContext(TrainingContext);
//   const navigate = useNavigate();

//   const API_BASE_URL = "http://62.72.59.3:5056";

//   const [formData, setFormData] = useState({
//     name: "",
//     number: "",
//     email: "",
//     venue: "",
//     no_of_participants: "",
//     chapter: "",
//     requested_date: "",
//     time: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "participants") {
//       setFormData({ ...formData, no_of_participants: value });
//     } else if (name === "date") {
//       setFormData({ ...formData, requested_date: value });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const isFormValid = Object.values(formData).every((field) => field !== "");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!isFormValid) {
//       toast.error("Please fill in all fields.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//       return;
//     }

//     try {
//       const response = await fetch(`${API_BASE_URL}/create-session`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         addRequest(result);
//         toast.success("Request Submitted Successfully!", {
//           position: "top-right",
//           autoClose: 3000,
//         });

//         setTimeout(() => navigate("/approval"), 1500);
//       } else {
//         const errorData = await response.json();
//         toast.error("Failed to submit request. Please try again.", {
//           position: "top-right",
//           autoClose: 3000,
//         });
//       }
//     } catch (error) {
//       toast.error("Error submitting request. Please try again later.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   };

//   return (
//     <div className="relative min-h-screen w-full overflow-x-hidden">
//       {/* Background */}
//       <div className="fixed inset-0 -z-10" aria-hidden="true">
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-cyan-100 to-[#c0f8ff]" />
//         {/* Decorative background shapes */}
//         <div className="absolute w-80 h-80 bg-gradient-to-tr from-blue-300/40 via-blue-500/20 to-cyan-200/30 rounded-full blur-3xl left-[-100px] top-[-80px]" />
//         <div className="absolute w-72 h-72 bg-indigo-300/20 rounded-full blur-2xl right-[-80px] bottom-[-90px]" />
//       </div>

//       <Header />

//       <main className="flex flex-col items-center px-4 py-10 mb-10">
//         <h1 className="text-4xl font-black text-gray-900 mb-8 drop-shadow">
//           Book Training
//         </h1>

//         <form
//           onSubmit={handleSubmit}
//           className="
//             relative
//             w-full max-w-4xl
//             bg-white/70
//             backdrop-blur-xl
//             shadow-2xl
//             rounded-3xl
//             p-10
//             border border-blue-100
//             ring-1 ring-white/40 ring-inset
//             before:content-['']
//             before:absolute before:inset-0 before:-z-10
//             before:rounded-3xl
//             before:bg-gradient-to-tr before:from-blue-200/60 before:via-cyan-100/40 before:to-white/30
//             grid grid-cols-1 md:grid-cols-2 gap-10
//             "
//           style={{
//             boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.12)"
//           }}
//         >
//           {/* LEFT COLUMN */}
//           <div className="space-y-1">
//             <div>
//               <label htmlFor="name" className="block text-gray-900 font-semibold mb-2">
//                 Name:
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 id="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Enter your name"
//                 className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition font-medium bg-white/80"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="number" className="block text-gray-900 font-semibold mb-2">
//                 Mobile Number:
//               </label>
//               <input
//                 type="text"
//                 name="number"
//                 id="number"
//                 value={formData.number}
//                 onChange={handleChange}
//                 placeholder="Enter your contact number"
//                 className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition font-medium bg-white/80"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="email" className="block text-gray-900 font-semibold mb-2">
//                 Email:
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 id="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Enter your email"
//                 className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition font-medium bg-white/80"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="venue" className="block text-gray-900 font-semibold mb-2">
//                 Venue:
//               </label>
//               <input
//                 type="text"
//                 name="venue"
//                 id="venue"
//                 value={formData.venue}
//                 onChange={handleChange}
//                 placeholder="Enter venue"
//                 className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition font-medium bg-white/80"
//                 required
//               />
//             </div>
//           </div>

//           {/* RIGHT COLUMN */}
//           <div className="space-y-1">
//             <div>
//               <label htmlFor="participants" className="block text-gray-900 font-semibold mb-2">
//                 No. of Participants:
//               </label>
//               <input
//                 type="number"
//                 name="participants"
//                 id="participants"
//                 value={formData.no_of_participants}
//                 onChange={handleChange}
//                 placeholder="Enter number of participants"
//                 className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition font-medium bg-white/80"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="chapter" className="block text-gray-900 font-semibold mb-2">
//                 Chapter:
//               </label>
//               <input
//                 type="text"
//                 name="chapter"
//                 id="chapter"
//                 value={formData.chapter}
//                 onChange={handleChange}
//                 placeholder="Enter chapter name"
//                 className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition font-medium bg-white/80"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="date" className="block text-gray-900 font-semibold mb-2">
//                 Requested Date:
//               </label>
//               <input
//                 type="date"
//                 name="date"
//                 id="date"
//                 value={formData.requested_date}
//                 onChange={handleChange}
//                 className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition font-medium bg-white/80"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="time" className="block text-gray-900 font-semibold mb-2">
//                 Time:
//               </label>
//               <input
//                 type="time"
//                 name="time"
//                 id="time"
//                 value={formData.time}
//                 onChange={handleChange}
//                 className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition font-medium bg-white/80"
//                 required
//               />
//             </div>
//           </div>

//           {/* Submit Button spanning full width under columns */}
//           <div className="md:col-span-2">
//             <button
//               type="submit"
//               disabled={!isFormValid}
//               className={`w-full font-bold py-4 rounded-xl transition-all duration-200 text-lg
//                 ${
//                   isFormValid
//                     ? "bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-700 text-white shadow-lg hover:scale-105 hover:shadow-2xl focus:ring-4 focus:ring-cyan-300"
//                     : "bg-gray-400 text-gray-200 cursor-not-allowed"
//                 }`}
//             >
//               Submit
//             </button>
//           </div>
//         </form>

//         <ToastContainer />
//       </main>
//     </div>
//   );
// };

// export default BookTraining;

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
      setFormData((prev) => ({ ...prev, no_of_participants: value }));
    } else if (name === "date") {
      setFormData((prev) => ({ ...prev, requested_date: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const isFormValid = Object.values(formData).every(
    (field) => field.trim() !== ""
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      toast.error("Please fill in all fields.", { position: "top-right" });
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
        let result;
        try {
          result = await response.json();
          console.log("Response JSON:", result);
        } catch (err) {
          console.warn("Failed to parse JSON:", err);
          result = {};
        }

        try {
          addRequest(result);
        } catch (err) {
          console.error("addRequest failed:", err);
        }

        toast.success("Request Submitted Successfully!", {
          position: "top-right",
          autoClose: 3000,
        });

        setTimeout(() => navigate(`/request-status/${result.id}`), 1500);
      } else {
        const errorData = await response.json();
        console.error("Backend error response:", errorData);
        toast.error("Failed to submit request. Try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Error submitting request. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-cyan-100 to-[#c0f8ff]" />
        <div className="absolute w-80 h-80 bg-gradient-to-tr from-blue-300/40 via-blue-500/20 to-cyan-200/30 rounded-full blur-3xl left-[-100px] top-[-80px]" />
        <div className="absolute w-72 h-72 bg-indigo-300/20 rounded-full blur-2xl right-[-80px] bottom-[-90px]" />
      </div>

      <Header />

      <main className="flex flex-col items-center px-4 py-10 mb-10 max-w-3xl mx-auto w-full">
        <h1 className="text-3xl font-black text-gray-900 mb-8 drop-shadow md:hidden block">
          Book Training
        </h1>

        <form
          onSubmit={handleSubmit}
          className="relative flex-1 bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-blue-100 ring-1 ring-white/40 ring-inset grid grid-cols-1 md:grid-cols-2 gap-10"
          style={{
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.12)",
            minWidth: 0,
            maxWidth: "600px",
          }}
        >
          <div className="md:col-span-2">
  <button
    type="button"
    onClick={() => navigate("/request-status")}
    className="w-full font-bold py-2 rounded-xl transition-all duration-200 text-lg bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-700 text-white shadow-lg hover:scale-105 hover:shadow-2xl focus:ring-4 focus:ring-cyan-300"
  >
    View My Previous Training Requests
  </button>
</div>


          {/* LEFT */}
          <div className="space-y-2">
            <Input
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              label="Mobile Number"
              name="number"
              value={formData.number}
              onChange={handleChange}
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              label="Venue"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
            />
          </div>

          {/* RIGHT */}
          <div className="space-y-2">
            <Input
              label="No. of Participants"
              name="participants"
              type="number"
              value={formData.no_of_participants}
              onChange={handleChange}
            />
            <Input
              label="Chapter"
              name="chapter"
              value={formData.chapter}
              onChange={handleChange}
            />
            <Input
              label="Requested Date"
              name="date"
              type="date"
              value={formData.requested_date}
              onChange={handleChange}
            />
            <Input
              label="Time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full font-bold py-2 rounded-xl transition-all duration-200 text-lg ${
                isFormValid
                  ? "bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-700 text-white shadow-lg hover:scale-105 hover:shadow-2xl focus:ring-4 focus:ring-cyan-300"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              Submit
            </button>
          </div>
        </form>

        <ToastContainer />
      </main>
    </div>
  );
};

// Custom Input Field Component
const Input = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label htmlFor={name} className="block text-gray-900 font-semibold mb-2">
      {label}:
    </label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      placeholder={`Enter ${label.toLowerCase()}`}
      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition font-medium bg-white/80"
      required
    />
  </div>
);

export default BookTraining;
