import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

/*
prevent leave는 저장하지 않고 떠나려고 할때
아직 저장하지 않았습니다라고 알려주는것이다.

beforunload는 window가 닫히기 전에 function이 실행되는걸 허락함

즉, window에 닫히기 전에 listner를 실행하게 만들고,
listener에서는 event를 막는 listner를 넣어서 추가적인 작업을 할수있게 만들수있다.
 */

const usePreventLeave = () => {
  const listener = (event) => {
    event.preventDefault();
    event.returnValue = "";
  };
  const enablePrevent = () => window.addEventListener("beforeunload", listener);
  const disablePrevent = () =>
    window.removeEventListener("beforeunload", listener);
  return { enablePrevent, disablePrevent };
};
const App = () => {
  const { enablePrevent, disablePrevent } = usePreventLeave();
  return (
    <div className="App">
      <button onClick={enablePrevent}>Proetct</button>
      <button onClick={disablePrevent}>UnProetct</button>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
