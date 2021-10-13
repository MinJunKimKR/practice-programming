import React, { useState } from "react";
import ReactDOM from "react-dom";

const useInput = (initialValue, validatior) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    let willUpdate = true;
    if (typeof validatior === "function") {
      willUpdate = validatior(value);
    }
    if (willUpdate) {
      setValue(value);
    }
  };
  return { value, onChange };
};

const App = () => {
  const maxLen = (value) => value.includes("@");
  const name = useInput("Mr. ", maxLen);
  return (
    <div className="App">
      <h2>Start editing to see some magic happen!</h2>
      <input placeholder="Name" {...name} />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
