import React, { useState } from "react";
import ReactDOM from "react-dom";

const content = [
  { tab: "session 1", content: "I'm the content of section 1" },
  { tab: "session 2", content: "I'm the content of section 2" },
];

const useTabs = (initialTab, allTabs) => {
  //setState는 모든것을 새로고침 즉 re-render해주는것이다
  const [currentIndex, setCurrentIndex] = useState(initialTab);
  if (!allTabs || !Array.isArray(allTabs)) {
    return;
  }
  return {
    currentItem: allTabs[currentIndex],
    changeItem: setCurrentIndex,
  };
};

const App = () => {
  const { currentItem, changeItem } = useTabs(0, content);
  return (
    <div className="App">
      {content.map((section, index) => (
        <button onClick={() => changeItem(index)}>{section.tab}</button>
      ))}
      <div>{currentItem.content}</div>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
