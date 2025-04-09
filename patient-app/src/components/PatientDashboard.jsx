import React from "react";
import MotivationCard from "./MotivationCard";
import SendHelpAlert from "./SendHelpAlert";
import SymptomForm from "./SymptomForm"; 

// You would typically get this from context or props
const dummyPatientId = "REPLACE_WITH_PATIENT_ID_FROM_CONTEXT_OR_AUTH";

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
        <SymptomForm patientId={dummyPatientId} />
      </section>

      <section>
        <SendHelpAlert />
      </section>
    </div>
  );
};

export default PatientDashboard;
