import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import PatientList from './components/Patient/PatienList';
import AddPatient from './components/Addpatient/AddPatient';
import DoctorList from './components/Doctor/DoctorList';
import AppointmentList from './components/Appointment/AppointmentList';

import Treatments from './components/Treatment/Treatments';
import './index.css';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <Header />
          <div style={{ padding: '20px' }}>
            <Routes>
              <Route path="/" element={<PatientList />} />
              <Route path="/patients" element={<PatientList />} />
              <Route path="/add-patient" element={<AddPatient />} />
              <Route path="/doctors" element={<DoctorList />} />
              <Route path="/appointments" element={<AppointmentList />} />
              <Route path="/treatments" element={<Treatments />} />
              
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
