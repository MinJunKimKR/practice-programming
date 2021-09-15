import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ThemeProvider} from "styled-components"
// 스타일 컴포넌트에서 자주사용하는 것들은 theme로 지정해서 사용하게된다. 자세한건 아래의 velog글을 참고하자
//https://velog.io/@hoi/Styled-components-ThemeProvider%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%EC%8A%A4%ED%83%80%EC%9D%BC-%ED%99%98%EA%B2%BD-%EA%B5%AC%EC%B6%95
import theme from './theme'
ReactDOM.render(
  <ThemeProvider theme ={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
