import React, { Component } from 'react';
import Router from 'Components/Router';
import Header from 'Components/Header';
//민들어둔 헤더를 import 하면 router 밖에 있기 때문에 항사 노출이 된다
//여러개의 리턴을 위하여 flagment를 쓴다
class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Router />
      </>
    );
  }
}

export default App;
