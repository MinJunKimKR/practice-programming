import React, { useContext, useState } from "react";

export const UserContext = React.createContext();
/*
Context 객체를 만듭니다. Context 객체를 구독하고 있는 컴포넌트를 렌더링할 때 
React는 트리 상위에서 가장 가까이 있는 짝이 맞는 Provider로부터 현재값을 읽습니다.
*/

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "MJ", loggedIn: false });
  const logUserIn = () => setUser({ ...user, loggedIn: true });
  return (
    <UserContext.Provider value={{ user, fn: { logUserIn } }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const { user } = useContext(UserContext);
  return user;
};

export const useFns = () => {
  const { fn } = useContext(UserContext);
  return fn;
};
export default UserContextProvider;
