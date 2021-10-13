import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

const useClick = (onClick) => {
  const element = useRef();
  useEffect(() => {
    if (element.current) {
      element.current.addEventListener("click", onClick);
    } //mount 혹은 update되었을떄 add를 call한다.
    return () => {
      //useEffect를 return받은 함수는 componentWillUnmount일때 호출
      if (element.current) {
        element.current.removeEventListener("click", onClick);
      }
    };
  }, []);
  //다만 여기의 [] - dependency가 없기에 update는 고려하지 않아도 된다.
  //만일 []를 넣지 않는다면, componentDidUpdate마다 리스너를 추가해줄꺼기 때문에
  return typeof onClick !== "function" ? element : undefined;
};

const App = () => {
  const sayHello = () => console.log("hello");
  const title = useClick(sayHello);
  return (
    <div className="App">
      <h1 ref={title}>Hi</h1>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
