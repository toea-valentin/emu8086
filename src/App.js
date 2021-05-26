import React from "react";
import Editor from "./components/Editor";
import Header from "./components/Header";
import Layout from "./components/Layout";
import CardsHolder from "./components/CardsHolder";
import RegistersCard from "./components/RegistersCard";
import FlagsCard from "./components/FlagsCard";
import GroupButtons from "./components/GroupButtons";
import Registers8bitCard from "./components/Registers8bitCard";
import axios from "axios";

function App() {
  const [codeText, setCodeText] = React.useState("");

  const [registers, setRegisters] = React.useState([]);
  const [steps, setSteps] = React.useState([]);

  const [flags, setFlags] = React.useState([]);
  const [flagsSteps, setFlagsSteps] = React.useState([]);

  const [stepIndex, setStepIndex] = React.useState(1);

  const [finalRegisters, setFinalRegisters] = React.useState([]);
  const [finalFlags, setFinalFlags] = React.useState([]);

  const [compiled, setCompiled] = React.useState(false);
  const [error, setError] = React.useState("");

  // function to update the editor text + reset compiled variable
  const handleCodeTextChange = (newVal) => {
    setCodeText(newVal);
    if (compiled) setCompiled(false);
  };

  // function to receive the results from python
  const getResults = () => {
    return axios.get(`/get`).then((res) => {
      setFinalRegisters(res.data.registers);
      setSteps(res.data.steps);
      setFinalFlags(res.data.flags);
      setFlagsSteps(res.data.flagsSteps);
    });
  };

  // reset current variables + post the text code to python, wait for compilation then request the results
  // in case the the python fails to compile and error card is shown.
  const handleAssembleCode = () => {
    if (codeText.length) {
      setError("");
      setRegisters([]);
      setFlags([]);
      const code = {
        code: removeComments(codeText),
      };

      axios.post(`/post`, code).then(
        (res) => {
          getResults().then(
            (res) => setCompiled(true),
            (err) => setError("Eroare in cod!")
          );
        },
        (err) => {
          setError("Eroare in cod!");
        }
      );
      setStepIndex(1);
    }
  };

  // display the final result of the code
  const handleRunCode = () => {
    setRegisters(finalRegisters);
    setFlags(finalFlags);
    setStepIndex(steps.length);
  };

  // as long as there are steps available, it goes through each at a time
  // updating the registers and flags at every step
  const handleSteps = () => {
    if (stepIndex < steps.length) {
      setRegisters(steps[stepIndex]);
      setFlags(flagsSteps[stepIndex]);
      setStepIndex(stepIndex + 1);
    }
  };

  // remove comments from the text code
  const removeComments = (text) => {
    const regex = /;.*(\n|$)/gi;

    let finalStr = text;
    finalStr = finalStr.replaceAll(regex, "\n");

    return finalStr;
  };

  return (
    <div className="App min-vh-100" style={{ background: "#2d2d2d" }}>
      <Header />
      {error && (
        <div
          className="alert alert-danger m-2"
          role="alert"
          style={{ position: "fixed", right: 0 }}
        >
          {error}
        </div>
      )}
      <GroupButtons
        handleAssembleCode={handleAssembleCode}
        handleRunCode={handleRunCode}
        handleSteps={handleSteps}
        compiled={compiled}
        stepIndex={stepIndex}
        lastStep={stepIndex === steps.length ? true : false}
      />
      <Layout>
        <Editor handleCodeTextChange={handleCodeTextChange} />
        <CardsHolder>
          <FlagsCard flags={flags} />
          <RegistersCard registers={registers} />
          <Registers8bitCard registers={registers} />
        </CardsHolder>
      </Layout>
    </div>
  );
}

export default App;
