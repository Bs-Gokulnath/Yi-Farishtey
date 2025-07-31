// import React, { useState, useContext } from "react";
// import { TrainingContext } from "../components/TrainingContext";
// import Header from "../components/Header";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const BookTraining = () => {
//   const { addRequest } = useContext(TrainingContext);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     number: "",
//     email: "",
//     venue: "",
//     participants: "",
//     chapter: "",
//     date: "",
//     trainer: "",
//     time: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     addRequest(formData);

//     toast.success("Request Submitted!", {
//       position: "top-right",
//       autoClose: 3000,
//     });

//     setTimeout(() => navigate("/approval"), 1500);
//   };

//   // ✅ Validation: Check if all fields are filled
//   const isFormValid = Object.values(formData);

//   return (
//     <div className="min-h-screen bg-[#BFF2FF] flex flex-col">
//       <Header />

//       <main className="flex flex-col items-center">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6">Book Training</h1>

//         <form
//           onSubmit={handleSubmit}
//           className="bg-[#85C2FF] shadow-lg rounded-2xl p-8 w-full max-w-4xl"
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {/* LEFT COLUMN */}
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-1">Name:</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Enter your name"
//                   className="w-full border border-gray-700 rounded-lg px-3 py-2"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-700 font-semibold mb-1">Number:</label>
//                 <input
//                   type="text"
//                   name="number"
//                   value={formData.number}
//                   onChange={handleChange}
//                   placeholder="Enter your contact number"
//                   className="w-full border border-gray-700 rounded-lg px-3 py-2"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-700 font-semibold mb-1">Email:</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Enter your email"
//                   className="w-full border border-gray-700 rounded-lg px-3 py-2"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-700 font-semibold mb-1">Venue:</label>
//                 <input
//                   type="text"
//                   name="venue"
//                   value={formData.venue}
//                   onChange={handleChange}
//                   placeholder="Enter venue"
//                   className="w-full border border-gray-700 rounded-lg px-3 py-2"
//                 />
//               </div>
//             </div>

//             {/* RIGHT COLUMN */}
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-1">No. of Participants:</label>
//                 <input
//                   type="number"
//                   name="participants"
//                   value={formData.participants}
//                   onChange={handleChange}
//                   placeholder="Enter number of participants"
//                   className="w-full border border-gray-700 rounded-lg px-3 py-2"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-700 font-semibold mb-1">Chapter:</label>
//                 <input
//                   type="text"
//                   name="chapter"
//                   value={formData.chapter}
//                   onChange={handleChange}
//                   placeholder="Enter chapter name"
//                   className="w-full border border-gray-700 rounded-lg px-3 py-2"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-700 font-semibold mb-1">Requested Date:</label>
//                 <input
//                   type="date"
//                   name="date"
//                   value={formData.date}
//                   onChange={handleChange}
//                   className="w-full border border-gray-700 rounded-lg px-3 py-2"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-700 font-semibold mb-1">Time:</label>
//                 <input
//                   type="time"
//                   name="time"
//                   value={formData.time}
//                   onChange={handleChange}
//                   className="w-full border border-gray-700 rounded-lg px-3 py-2"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="mt-6">
//             <button
//               type="submit"
//               disabled={!isFormValid} // ✅ Disabled until form is valid
//               className={`w-full font-bold py-3 rounded-lg transition ${
//                 isFormValid
//                   ? "bg-[#00A9B9] text-white hover:bg-[#008b99]"
//                   : "bg-gray-400 text-gray-200 cursor-not-allowed"
//               }`}
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

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    venue: "",
    participants: "",
    chapter: "",
    date: "",
    trainer: "",
    time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send form data to backend
      const response = await fetch('http://localhost:5000/api/training-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        addRequest(formData); // Update context if needed
        toast.success("Request Submitted!", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => navigate("/approval"), 1500);
      } else {
        throw new Error('Failed to submit request');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Error submitting request. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // Validation: Check if all required fields are filled
  const isFormValid = Object.values(formData).every((value) => value.trim() !== "");

  return (
    <div className="min-h-screen bg-[#BFF2FF] flex flex-col">
      <Header />

      <main className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Book Training</h1>

        <div
          className="bg-[#85C2FF] shadow-lg rounded-2xl p-8 w-full max-w-4xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LEFT COLUMN */}
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Name:</label>
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
                <label className="block text-gray-700 font-semibold mb-1">Number:</label>
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
                <label className="block text-gray-700 font-semibold mb-1">Email:</label>
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
                <label className="block text-gray-700 font-semibold mb-1">Venue:</label>
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
                <label className="block text-gray-700 font-semibold mb-1">No. of Participants:</label>
                <input
                  type="number"
                  name="participants"
                  value={formData.participants}
                  onChange={handleChange}
                  placeholder="Enter number of participants"
                  className="w-full border border-gray-700 rounded-lg px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Chapter:</label>
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
                <label className="block text-gray-700 font-semibold mb-1">Requested Date:</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full border border-gray-700 rounded-lg px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Time:</label>
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