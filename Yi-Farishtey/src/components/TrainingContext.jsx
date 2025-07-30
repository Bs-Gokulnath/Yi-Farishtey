import React, { createContext, useState } from "react";

export const TrainingContext = createContext();

export const TrainingProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);

  const addRequest = (data) => {
    setRequests((prev) => [
      ...prev,
      { ...data, id: prev.length + 1, status: "Pending" },
    ]);
  };

  const updateRequest = (id, updatedData) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, ...updatedData } : req))
    );
  };

  return (
    <TrainingContext.Provider value={{ requests, addRequest, updateRequest }}>
      {children}
    </TrainingContext.Provider>
  );
};
