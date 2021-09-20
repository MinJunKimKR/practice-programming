import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

/*
useEffect는 componentWillUnmount와 
componentDidMount, componentWillUpdate와 비슷함

매번 누를때마다 콘솔로그를 실행시킨다.
-> 새로고침을 하면 실해이 된다.

DidUpdate의 역할도 하기에 클릭하면 sayHello를 실행한다.

useEffect의 인자는 2개가 있는데 첫번쨰 인자는 function이고, 
두번쨰 인자는 배열인데, 이 배열의 값이 바뀌때 실행이 된다는 의미다. (dependency)

만일에 1번만 실행(처음에) 시키고 싶다면 dependency에 빈배열을 넣으면 한번만 실행이된다.

useEffect는 function을 return하는데,
이것은 componentWillUnmount일것이다.

*/

const App = () => {
  const [number, setNumber] = useState(0);
  const [aNummber, setAnumber] = useState(0);
  const sayHello = () => console.log("hello");
  useEffect(() => {
    sayHello();
  }, [number]);
  return (
    <div className="App">
      <div>Hi</div>
      <button onClick={() => setNumber(number + 1)}>{number}</button>
      <button onClick={() => setAnumber(aNummber - 1)}>{aNummber}</button>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
