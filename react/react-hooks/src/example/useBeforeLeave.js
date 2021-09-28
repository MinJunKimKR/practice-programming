import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

/*

us] eBefozreLeave - 기본적으로 탭을 닫을떄 실행되는 function
 */

const useBeforeLeave = (onBefore) => {
  const handle = (event) => {
    console.log("leaving");
    const { clientY } = event;
    if (clientY <= 0) {
      onBefore();
    }
  };
  const element = useEffect(() => {
    document.addEventListener("mouseleave", handle);
    return () => document.removeEventListener("mouseleave", handle);
  }, []);
  if (typeof onBefore !== "function") {
    return;
  }
  return element;
};

const App = () => {
  const begForLife = () => console.log("don't leave me alone");
  useBeforeLeave(begForLife);
  return <div className="App"></div>;
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
