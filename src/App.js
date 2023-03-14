import React from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import EmployeeForm from "./pages/EmployeeForm";
import TaskForm from "./pages/TaskForm";
import MeetingForm from "./pages/MeetingForm";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="employee" element={<EmployeeForm />} />
          <Route path="task" element={<TaskForm />} />
          <Route path="meeting" element={<MeetingForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
