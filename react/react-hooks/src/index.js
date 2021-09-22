import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

/*
  reference는 기본적으로 component의 어떤부분을 선택할수 있는 방법이다
  마치 document.getElementById()와 같다

  react에 있는 모든 component는 reference element를 가지고 있다.

  useEffect는 componentDidMount에서 작동을한다.
  따라서 componentWillMount에서 listner를 정리 해줄 필요가 있다.
  
  즉, 근복적으로 eventListener를 스스로 정리하게끔 만들어 줘야한다.

  const useClick = (onClick) => {
  const element = useRef();
  useEffect(() => {
    if (element.current) {
      element.current.addEventListener("click", onClick);
    } //mount 혹은 update되었을떄 add를 call한다.
    return () => { //useEffect를 return받은 함수는 componentWillUnmount일때 호출
      if (element.current) {
        element.current.removeEventListener("click", onClick);
      }
    };
  }, []); 
  //다만 여기의 [] - dependency가 없기에 update는 고려하지 않아도 된다.
  //만일 []를 넣지 않는다면, componentDidUpdate마다 리스너를 추가해줄꺼기 때문에
  return element;
};

component가 mount되지 않았을떄 리스너가 배치되게 하고 싶지 않기 때문에 이와같은 방법을 택한다.
*/

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
