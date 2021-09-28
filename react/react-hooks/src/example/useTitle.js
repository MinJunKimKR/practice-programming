import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

/*
  문서 제목을 바꿀떄는 보통 helmet을 사용하는데 hooks로 해결하는 방법을 사용한다.

  최초로 useTitle이 마운트 될떄 useEffect가 실행이 된다.
  따라서, 기본으로 지정해주는 값이 useEffect를 통해서 title에 들어가게되고,
  이것이 기본값이 된다.
*/

const useTitle = (initialTitle) => {
  const [title, setTitle] = useState(initialTitle);
  const updateTitle = () => {
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerText = title;
  };
  useEffect(updateTitle, [title]);
  return setTitle;
};

const App = () => {
  const titleUpdater = useTitle("Loading ...");
  return (
    <div className="App">
      <div>Hi</div>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
