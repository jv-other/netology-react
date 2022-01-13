import React, { useState } from "react";
import StepsRepository from "./components/Steps/StepsRepository";
import StepsForm from "./components/Steps/StepsForm";
import StepsTable from "./components/Steps/StepsTable";
import "./App.css";

const repository = new StepsRepository();

function App() {
  const [state, setState] = useState({
    entry: null // редактируемая запись
  });

  const onEdit = stepId => setState({ entry: repository.get(stepId) });

  const onSubmit = step => {
    repository.addOrUpdate(step);
    setState({ entry: null });
  };

  const onRemove = stepId => {
    repository.remove(stepId);
    setState({ entry: null });
  }

  return (
    <div className="app-container">
      <StepsForm onSubmit={onSubmit} step={state.entry} />
      <StepsTable steps={repository.list()} onEdit={onEdit} onRemove={onRemove} />
    </div>
  );
}

export default App;
