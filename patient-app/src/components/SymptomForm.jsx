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
  const [showModal, setShowModal] = useState(false);
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
      setShowModal(true);
    } catch (err) {
      console.error("Submission error:", err.message);
    }
  };

  if (!patientId) {
    return (
      <div className="alert alert-danger">
        No patient ID found. Please log in again.
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-primary mb-4">
            Daily Symptom Checklist
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              {SYMPTOMS.map((symptom) => (
                <div className="form-check" key={symptom}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={symptom}
                    id={symptom}
                    checked={selectedSymptoms.includes(symptom)}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor={symptom}>
                    {symptom.replace(/_/g, " ")}
                  </label>
                </div>
              ))}
            </div>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Symptoms"}
            </button>
          </form>

          {error && (
            <div className="alert alert-danger mt-3">
              Error: {error.message}
            </div>
          )}
        </div>
      </div>

      {/* Bootstrap Modal */}
      {showModal && data && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Submission Successful</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Symptoms submitted for{" "}
                  <strong>{data.submitSymptoms.PatientID.name}</strong>!
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomForm;
