import React from "react";
import MotivationCard from "./MotivationCard";
import SendHelpAlert from "./SendHelpAlert";
import SymptomForm from "./SymptomForm";

const patientId = localStorage.getItem("patientId");

const PatientDashboard = () => {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">Patient Dashboard</h1>
        <p className="text-muted">Stay informed and request help when needed</p>
      </header>

      <section className="mb-4">
        <MotivationCard />
      </section>

      <section className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Daily Symptom Check-In</h2>
        <SymptomForm patientId={patientId} />
      </section>

      <section>
        <SendHelpAlert />
      </section>
    </div>
  );
};

export default PatientDashboard;
