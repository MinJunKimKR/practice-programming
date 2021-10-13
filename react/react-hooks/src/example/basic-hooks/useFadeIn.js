import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

/* 
  Css로도 할수있지만, Hooks를 이용해서 애니메이션을 구현해보도록 하자

  component가 mount되면 서서히 

  return { ref: element, style: { opacity: 0 } };
      <h1 {...fadeInH1}>Hello</h1>

    과 같은 형태로 hooks에서 css를 적용해줄수 있다.
 */

const useFadeIn = (duration = 1, delay = 1) => {
  const element = useRef();
  console.log(element);
  useEffect(() => {
    if (element.current) {
      const { current } = element;
      current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`;
      current.style.opacity = 1;
    }
  }, []);
  if (typeof duration !== "number" || typeof delay !== "number") return;
  return { ref: element, style: { opacity: 0 } };
};

const App = () => {
  const fadeInH1 = useFadeIn(3, 2);
  const fadeInP = useFadeIn(5, 1);

  return (
    <div className="App">
      <h1 {...fadeInH1}>Hello</h1>
      <p {...fadeInP}>Pdjkekfneak</p>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
