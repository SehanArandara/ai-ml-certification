import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom';
import ValidationPage from './pages/ValidationPage';
import SelectionPage from './pages/SelectionPage';
import Certificate from './components/Certificate';
import { students } from './data/students';

const CertificateView = () => {
  const { id } = useParams();
  const student = students.find(s => s.id === id);

  if (!student) {
    return <Navigate to="/" replace />;
  }

  return <Certificate student={student} />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ValidationPage />} />
        <Route path="/select-certificate/:id" element={<SelectionPage />} />
        <Route path="/certificate/:id" element={<CertificateView />} />
      </Routes>
    </Router>
  );
}

export default App;
