import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'; //URL에 # 라고 나오는게 hash route를 쓰기 떄문임
// Browser router ->원래의 웹사이트 처럼 보여준다 : HTML history를 쓴다
// Hash router -> url이 이쁘진 않음, 웹이아닌 앱에 있다는 느낌을 준다 : hash를 쓴다
import Home from 'Routes/Home';
import TV from 'Routes/TV';
import Search from 'Routes/Search';
/*
NOTE : 
 <></>
 깜싼이유는 1개의 child만 return 할수 있어서임
 Composition은 두개 이상의 라우트러르 랜더링 하는 방법임
 -> 예를 들어 TV안에 tab 들이 있을떄 (/tv/popular)쓸수있다
 이때 2개의 component가 전부 적합하기 때문에 둘다 랜더링이된다. 
 
 Redirect 는 아무곳도 아닐떄 /으로 리다이렉트 시킬려고한다
 하지만 같은 route로 render를 하려고 하면 에러가 나는데 이는, 위에서 한것처럼 composition error가 
 나기 때문이다. 이것을 해결해 주기위하여 Switch를 사용한다

 switch는 1개의 ruote만 render되게 해준다
 하지만 이결우에 아까 만든 popular가 같이 보이지 않게 해준다 exact를 넣어주면 정확히 같을때만 랜더된다
 
*/
export default () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/tv" exact component={TV} />
      <Route path="/search" component={Search} />
      <Redirect from="*" to="/" />
    </Switch>
  </Router>
);
