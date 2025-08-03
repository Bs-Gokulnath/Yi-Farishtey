import React, { useState } from "react";
import Header from "../components/Header";

const AddInstitution = () => {
  const [institution, setInstitution] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (institution.trim() === "") {
      alert("Please enter an institution name.");
      return;
    }
    alert(`Institution "${institution}" added successfully!`);
    setInstitution("");
  };

  return (
    <div className="min-h-screen bg-[#F3F8FF] flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Container */}
      <main className="flex flex-col items-center justify-center flex-1">
        <div className="bg-[#F3F8FF] shadow-lg rounded-2xl p-6 w-full max-w-sm">
          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            Add Institution
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              placeholder="Enter Institution Name"
              className="border border-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Add
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddInstitution;
