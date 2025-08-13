import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './auth/signup';
import Signin from './auth/signin';
import BookTraining from './pages/book_training';
import AdminApprovalDashboard from './pages/approval_dashboard';
import RequestStatus from "./pages/MyTrainingRequests";
import { TrainingProvider } from './components/TrainingContext'; 
import Homepage from './pages/Homepage';
import AddInstitution from './pages/add_institution';
import AddTrainer from './pages/add_trainer';
import AdminApprovalPage from './pages/add_ins_tra';
import SuperAdminApprovalDashboard from './pages/SuperAdminApprovalDashboard';

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
          <Route path="/add-institution" element={<AddInstitution />} />
          <Route path="/add-trainer" element={<AddTrainer />} />
          <Route path="/admin-ins-tra" element={<AdminApprovalPage />} />
          <Route path="/request-status" element={<RequestStatus />} />
          <Route path="/super-admin-approval" element={<SuperAdminApprovalDashboard />} />

        </Routes>
      </BrowserRouter>
    </TrainingProvider>
  );
}

export default App;
