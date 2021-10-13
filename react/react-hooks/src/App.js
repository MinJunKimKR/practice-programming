import React from "react";
import Lang from "./context";
import Screen from "./Screen";
import traslations from "./translations";
// import UserContextProvider from "./context";
/*

App이 가장 큰 컴포넌트가 될것이다.

App - Screen - Header
 */

const App = () => {
  return (
    <Lang defaultLang="en" translations={traslations}>
      <Screen></Screen>
    </Lang>
  );
};

export default App;
