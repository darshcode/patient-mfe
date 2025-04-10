import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const SEND_HELP_ALERT = gql`
  mutation SendHelpAlert($patientId: ID!, $message: String) {
    sendHelpAlert(patientId: $patientId, message: $message) {
      id
      viewed
      createdAt
    }
  }
`;

const SendHelpAlert = () => {
  const patientId = localStorage.getItem("patientId");
  const [message, setMessage] = useState("");
  const [sendAlert] = useMutation(SEND_HELP_ALERT);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!patientId) {
      alert("Patient ID missing.");
      return;
    }

    await sendAlert({
      variables: { patientId, message },
    });

    setMessage("");
    setShowModal(true);
  };

  return (
    <div className="card p-3 mb-4 shadow-sm">
      <h5 className="card-title text-danger">Request Help</h5>
      <form onSubmit={handleSubmit}>
        <textarea
          className="form-control mb-2"
          placeholder="Optional message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btn btn-danger" type="submit">
          Send Alert
        </button>
      </form>

      {/* Modal for confirmation */}
      {showModal && (
        <>
          <div
            className="modal fade show"
            style={{ display: "block" }}
            tabIndex="-1"
            role="dialog"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Help Alert Sent</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Your request for help has been sent successfully.</p>
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
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};

export default SendHelpAlert;
