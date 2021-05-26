import React from "react";

const GroupButtons = ({
  handleAssembleCode,
  handleRunCode,
  handleSteps,
  compiled,
  stepIndex,
  lastStep,
}) => {
  return (
    <>
      <div
        className="d-flex align-items-center"
        style={{ marginTop: 30, paddingBottom: 20 }}
      >
        <div className="d-flex flex-column align-items-center" style={{ flex: 0.5 }}>
          <p className="m-0 ml-5" style={{ color: "white" }}>
            Status: {compiled ? "Compiled" : "Uncompiled"}
          </p>
          <p className="m-0 ml-5" style={{ color: "white" }}>
            Current Step: {(stepIndex - 1 ) + (lastStep ? ' - END' : '')}
          </p>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <button
            className="btn btn-lg btn-warning mr-2"
            style={{ boxShadow: "rgb(0 0 0 / 30%) 0px 2px 15px" }}
            onClick={() => {
              handleAssembleCode();
            }}
          >
            Compile
          </button>
          <button
            disabled={!compiled}
            className="btn btn-lg btn-outline-primary mr-2"
            style={{ boxShadow: "rgb(0 0 0 / 30%) 0px 2px 15px" }}
            onClick={() => {
              handleRunCode();
            }}
          >
            Run
          </button>
          <button
            disabled={!compiled}
            className="btn btn-lg btn-outline-primary"
            style={{ boxShadow: "rgb(0 0 0 / 30%) 0px 2px 15px" }}
            onClick={() => {
              handleSteps()
            }}
          >
            Next Step
          </button>
        </div>
      </div>
    </>
  );
};

export default GroupButtons;
