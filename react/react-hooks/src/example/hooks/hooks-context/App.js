import React from "react";
import Screen from "./Screen";
import UserContextProvider from "./context";
/*

App이 가장 큰 컴포넌트가 될것이다.

App - Screen - Header
 */

const App = () => {
  return (
    <UserContextProvider>
      <Screen />
    </UserContextProvider>
  );
};

export default App;
