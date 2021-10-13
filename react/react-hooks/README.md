# React Hooks



## Intro

React state와 props를 가지고 있다.

만일 세화면 모두가 사용자의 사진을 가지고 있다고 가정해보자

만일 화면을 변경한다고 하면, 매번 API에 요청을 보내야 하는데, 이것은 너무 많은 request를 요청하게 된다.

따라서 state를 다른곳에 저장을 하고 화면에는 그 state를 보내주기만 해야한다.

만일, 그냥 보여주기만 하는것이라면, 모든 화면을 어우르는 큰 component가 존재하고,

가장큰 component가 state를 전부 가지고 하위의 component에는 데이터만 보내주면된다.

하지만, 정보를 수정하거나 하게될때는 얘기가 달라진다.

바로 이때가 Redux 혹은 context와 같은 state management를 사용을 하는 순간이다.

  

## UseContext in Action

### 예시코드

App.js

```react
import React, { useEffect, useRef, useState } from "react";
import Screen from "./Screen";
/*

App이 가장 큰 컴포넌트가 될것이다.

App - Screen - Header
 */

const App = () => {
  const [user] = useState({
    name: "MJ",
  });
  return (
    <>
      <Screen user={user} />
    </>
  );
};

export default App;

```

Screen.js

```react
import React from "react";
import Header from "./Header";

const Screen = ({ user }) => {
  return (
    <div>
      <Header user={user} />
      <h1>First screen</h1>
    </div>
  );
};

export default Screen;

```

Header.js

```react
import React from "react";

const Header = ({ user }) => (
  <header>
    <a href="#">Home</a> Hello, {user.name}!
  </header>
);

export default Header;

```

위와같이 안쓰는 component에서도 props를 전달해 줘야하니까 번거로워 진다.

이제 이걸 context를 사용해서 개선해볼것이다.

### Context로 개선하기

context는 내 어플리케이션의 저장소 라는걸 잊지말자



Context.js

```react
import React, { useState } from "react";

export const UserContext = React.createContext();
/*
Context 객체를 만듭니다. Context 객체를 구독하고 있는 컴포넌트를 렌더링할 때 
React는 트리 상위에서 가장 가까이 있는 짝이 맞는 Provider로부터 현재값을 읽습니다.
*/

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "MJ", loggedIn: false });
  const logUserIn = () => setUser({ ...user, loggedIn: true });
  return (
    <UserContext.Provider value={{ user, logUserIn }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

```

Provider는 value가 필요하다. 

이제 **이 Provider에 있는 모든 children은 User(state)에 대한 접근권한이 생겼다.**

이유는 UserContext.Provider 를 찾아가서 props를 받기때문이다.

전과 같이 component가 다른 Compoent로 값을 전달하는 형식이 아닌, context를 App상위에서 덮어주고, 하위의 component들은 context를 통해서 자신이 아닌 'Context' 내부의 state와 setState를 사용하는것이다.

App.js

```react
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

```

Screen.js

```react
import React, { useContext } from "react";
import Header from "./Header";
import { UserContext } from "./context";

const Screen = () => {
  const { logUserIn } = useContext(UserContext);
  return (
    <div>
      <Header />
      <h1>First screen</h1>
      <button onClick={logUserIn}>Log In</button>
    </div>
  );
};

export default Screen;

```

Header.js

```react
import React, { useContext } from "react";
import { UserContext } from "./context";
const Header = () => {
  const {
    user: { name, loggedIn },
  } = useContext(UserContext);
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

```



### context 개선하기

context.js

```react

export const useUser = () => {
  const { user } = useContext(UserContext);
  return user;
};

export const useFns = () => {
  const { fn } = useContext(UserContext);
  return fn;
};	
```

위와 같이 context를 사용할때 한상 useContext를 사용해야 하니까 이렇게 미리 context파일 내부에서 export해서 외부에서 사용할수 있게 만들어 줄수 있다.







