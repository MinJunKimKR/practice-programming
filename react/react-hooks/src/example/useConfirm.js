import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

/*
use Confirm은 사용자가 무언가를 하기전에 확인 하는것

 */

const useConfirm = (message, onConfirm, onCancle) => {
  if (!onConfirm || typeof onConfirm !== "function") {
    return;
  }
  if (!onCancle || typeof onCancle !== "function") {
    return;
  }
  const confirmAction = () => {
    if (window.confirm(message)) {
      onConfirm();
    } else {
      onCancle();
    }
  };
  return confirmAction;
};

const App = () => {
  const deleteWorld = () => console.log("Deleting the world ....");
  const abort = () => console.log("Aborted");
  const confirmDelete = useConfirm("Are you sure", deleteWorld, abort);
  return (
    <div className="App">
      <button onClick={confirmDelete}>Delete the world</button>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
