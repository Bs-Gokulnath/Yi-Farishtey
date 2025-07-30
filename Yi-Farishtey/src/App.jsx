import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './auth/signup';
import Signin from './auth/signin';
import BookTraining from './pages/book_training';
import AdminApprovalDashboard from './pages/approval_dashboard';
import { TrainingProvider } from './components/TrainingContext'; 
import Homepage from './pages/Homepage';

function App() {
  return (
    <TrainingProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/book-training" element={<BookTraining />} />
          <Route path="/approval" element={<AdminApprovalDashboard />} />
        </Routes>
      </BrowserRouter>
    </TrainingProvider>
  );
}

export default App;
