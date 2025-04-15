import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

// GraphQL mutation
const SUBMIT_SYMPTOMS = gql`
  mutation SubmitSymptoms($input: SymptomInput!) {
    submitSymptoms(input: $input) {
      id
      submissionDate
      symptoms
      PatientID {
        id
        name
      }
    }
  }
`;

// Enum values from your schema
const SYMPTOMS = [
  "fever",
  "cough",
  "shortness_of_breath",
  "fatigue",
  "sore_throat",
  "body_aches",
  "congestion",
  "runny_nose",
];

const SymptomForm = ({ patientId }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [submitSymptoms, { loading, error, data }] =
    useMutation(SUBMIT_SYMPTOMS);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedSymptoms((prev) =>
      prev.includes(value)
        ? prev.filter((symptom) => symptom !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await submitSymptoms({
        variables: {
          input: {
            PatientID: patientId,
            symptoms: selectedSymptoms,
          },
        },
      });
      setSelectedSymptoms([]);
      alert("Symptoms submitted successfully!");
    } catch (err) {
      console.error("Submission error:", err.message);
    }
  };

  return (
    <div>
      <h2>Daily Symptom Checklist</h2>
      <form onSubmit={handleSubmit}>
        {SYMPTOMS.map((symptom) => (
          <div key={symptom}>
            <label>
              <input
                type="checkbox"
                value={symptom}
                checked={selectedSymptoms.includes(symptom)}
                onChange={handleChange}
              />
              {symptom.replace(/_/g, " ")}
            </label>
          </div>
        ))}
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Symptoms"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
      {data && (
        <p style={{ color: "green" }}>
          ✔ Submitted for: {data.submitSymptoms.PatientID.name}
        </p>
      )}
    </div>
  );
};

export default SymptomForm;
