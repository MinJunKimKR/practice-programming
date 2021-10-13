import React, { useContext } from "react";
import Header from "./Header";
import { useFns } from "./context";

const Screen = () => {
  // const {logUserIn} = useContext(UserContext);
  const { logUserIn } = useFns();
  return (
    <div>
      <Header />
      <h1>First screen</h1>
      <button onClick={logUserIn}>Log In</button>
    </div>
  );
};

export default Screen;
