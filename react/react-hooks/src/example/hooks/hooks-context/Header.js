import React, { useContext } from "react";
import { UserContext, useUser } from "./context";
const Header = () => {
  /*
  const {
    user: { name, loggedIn },
  } = useContext(UserContext);
    */
  const { name, loggedIn } = useUser();
  /*
  context 객체(React.createContext에서 반환된 값)을 받아
   그 context의 현재 값을 반환합니다. 
   context의 현재 값은 트리 안에서 이 Hook을 호출하는 컴포넌트에 
   가장 가까이에 있는 <MyContext.Provider>의 
   value prop에 의해 결정됩니다.
  */
  return (
    <header>
      <a href="#">Home</a> Hello, {name}, You are{" "}
      {loggedIn ? "Logged In" : "Who the fuck are you?"}!
    </header>
  );
};

export default Header;
