# react의 구조

## public

public directory 내부의 index.html의 `<div id="root"></div>` 부분이 있다.
react는 저 id가 root인 div 내부에 내용을 바꿔가면서 보여주는데 이것을 가상DOM (virtual DOM) 이라고 한다

## index.js

가장 상위의 react 파일
실제 랜더링 되는 components를 import해서 사용한다

## App.js

이 파일에서 개발에 사용하는 component를 import해준다

이때 import되는 GlobalStyles, Header와 같이 상위개념의 component를 가져온다

민들어둔 헤더를 import 하면 router 밖에 있기 때문에 항상 노출이 된다

여러개의 리턴을 위하여 flagment를 쓴다

---

## router.js

URL의 router가 바뀔떄다르게 보여줄 component를 정의해준다.
이 component로 인하여 URL이 바뀔떄마다 다른 페이지를 보여줄수 있게된다.

## Header.js

index.js파일을 넣고 header 파일을 굳이 import시키는 이유는

App.js에서 `import Header from 'Components/Header'; `와 같이 import해주고 싶기 때문이다.

```
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
const globalStyle = createGlobalStyle`

`;
```

# router

URL에 # 라고 나오는게 hash route를 쓰기 떄문임
`<></>`로 깜싼이유는 1개의 child만 return 할수 있어서임

## Browser router

원래의 웹사이트 처럼 보여준다 : HTML history를 쓴다

## Hash router

url이 이쁘진 않다.

웹이아닌 앱에 있다는 느낌을 준다

Composition은 두개 이상의 라우트로 랜더링 하는 방법이다

-> 예를 들어 TV안에 tab 들이 있을떄 (/tv/popular)쓸수있다.

이때 2개의 component가 전부 적합하기 때문에 둘다 랜더링이된다.

Redirect 는 아무곳도 아닐떄 /으로 리다이렉트 시킬려고한다.

하지만 같은 route로 render를 하려고 하면 에러가 나는데 이는, 위에서 한것처럼 composition error가 나기 때문이다.

이것을 해결해 주기위하여 **Switch를** 사용한다

switch는 1개의 ruote만 render되게 해준다.

# Component

component를 쓰는 이유는 어플리케이션의 부분부분을 캡슐화 해서 쓰기 위해서 사용한다.

그렇기 떄문에 html, css, js, logic 을 한 곳에 모아서 독립적인 모듈화 시키고 싶기에 사용을 한다.

## component folder

우선 component의 개념을 가진 folder를 만든후 html, css, js 다같이 넣어서 폴더별로 관리하는 방법이 있다.

하지만 문제점은 css의 classname을 사용을 할때마다 기억해야하고, 중복이 되면안되며 쓸때마다 import해줘야 하기에 불편하다.
그렇기에 global로 적용이 되는 css가 아닌 local적용이 되는 css를 만들어야 한다.

## css module

_강의 3.1_

위의 문제를 개선할수 있는 방법은 바로 **css를 module화** 시키는방법이다.

RCA 에서는 css naming을 Header.module.css와 같이 만들게 되면 css파일이 module화가 되어서
js 처럼 `import styles from './Header.module.css';`와 같은 방법으로 import할수 있게된다.

또한 적용하는 위치에서는 `<ul className={styles.navList}>` 와 같이 사용을 하게되면 적용이되며 클래스네임은
실제 랜더링 되었을떄 classname이 자동 변경된다

하지만 여전히 classname 을 기억해야 한다는 단점이 있다.
그렇기에 하나의 파일로 합치고 싶으며 className을 기억하고 있지 않아도 쓰고싶다.

## styled-component

_강의 3.3_
위와 같은 니즈로 인해 만들어 진것이 styled-compoent 다.

```
import styled from 'styled-components';

const List = styled.ul`
display: flex; &:hover { background-color: blue; }`;
```

위와 같은 소스를 추가한후 (여기에서 List는 ul이 된다.)

```
<header>
    <List> //기존에 <ul> 자리
      <li>
```

기존의 ul이 있던자리에 넣으면 잘 적용이 된다.

## Style-compoent에 Link 연결하기

`<a>` 태그와 같이 link를 설정해줄떄 `<a href="/">Movies</a>` 의 방식을 사용하지 않기 위하여
`import {Link} from 'react-router-dom'` 을 사용할 것이다.

`Link` 는 페이지 내의 링크가 존재한다면 **브라우저한 방식**이 아닌 **JS한 방식**으로 가게 해준다.

Link 는 Rotuter-dom에서 가져온 것이기에 ` const SLink = styled(Link)``;  `처럼 선언해준다.

그이후에 `<a href="/">Movies</a>`소스를 `<SLink to="/">Movies</SLink>` 이렇게 바꿔주자.

다만 이때 **Header에서 Route-dom**을 쓰게 되는데 **Route dom은 1개의 Router밖에** 존재할수 없기 떄문에
Router 내부의 Route로 들어가게된다.

이때, **only one child의 원칙**에 따라 `<></>` 을 써서 Switch부분과 Header를 1개의 child로 묶어준다.

## 3.4 global style

SC을 설치하거나 font 설정을 위해 사용한다

`npm install styled-reset`는 SC를 이용해서 css를 초기화한 다음에 적용해주도록 한다.

```
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const globalStyles = createGlobalStyle`
    ${reset}
    a{
        text-decoration : none;
        color :inherit;
    }
    *{
        box-sizing : border-box;
    }

    body{
        font-family : -apple-system, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size :14px;
        background-color :rgba(20,20,20,1)
    }
`;

export default globalStyles;
```

위 와같이 global style을 정의해준다

이렇게 정의해둔 global style은 App.js에 Router하단에 추가해주면 global하게 적용이 된다

```
class App extends Component {
  render() {
    return (
      <>
        <Router />
        <GlobalStyles />
      </>
    );
  }
}
```

# SC(Styled component) props를 전달하는법

`border-bottom: 5px solid ${(props) => (props.current ? '#3498db' : 'transparent')}; `

위와 같이 props를 SC내에서 사용할수 있으며, render를 할떄에

`<Item current={true}>` 이와 같이 props값을 전달해 줄수 있다

withRouter는 다른 컴포넌트를 감싸는 컴포넌트다.

```
export default withRouter(() => (
  <Header>
    <List>
      <Item current={true}>
        <SLink to="/">Movies</SLink>
      </Item>
      <Item current={true}>
        <SLink to="/tv">TV</SLink>
      </Item>
      <Item current={true}>
        <SLink to="/search">Search</SLink>
      </Item>
    </List>
  </Header>
));
```

위와 같이 withRouter를 쓸수가 있다

이는

```
const HeaderC = () => (
  <Header>
    <List>
      <Item current={true}>
        <SLink to="/">Movies</SLink>
      </Item>
      <Item current={true}>
        <SLink to="/tv">TV</SLink>
      </Item>
      <Item current={true}>
        <SLink to="/search">Search</SLink>
      </Item>
    </List>
  </Header>
);
export default withRouter(HeaderC);
```

위와 같은형태이기에 props를 가질수 있게 된다.

즉, WithRouter를 쓰면 router 에서 값을 가져와서 props에서 쓸수 있게된다.

`(({ location: { pathname } }) ` 를 사용해서 spead를 하여 pathname을 가져오고,

```
<Item current={pathname === '/'}>
        <SLink to="/">Movies</SLink>
      </Item>
      <Item current={pathname === '/tv'}>
        <SLink to="/tv">TV</SLink>
      </Item>
      <Item current={pathname === '/search'}>
        <SLink to="/search">Search</SLink>
      </Item>
```

위와 같이 조건을 현재의 라우트 pathname으로 판변하게 하면 현재의 route 위치와 그에 따른 효과를 줄수있다.

# Networking

api.js 이라는 파일을 만들어서 api와 통신하는 코드를 몰아 넣을것이다.

## axios

```
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "----",
    language: "en-US",
  },
});

```

위와 같이 baseURL과 params를 설정을 해준다면 중복되는 코드를 막을수가 있다.

```
export const moviesApi = {
  nowPlaying: () => api.get("movie/now_playing"),
  upcoming: () => api.get("movie/upcoming"),
  popular: () => api.get("movie/popular"),
};

export const tvApi = {
  topRated: () => api.get("tv/top_rated"),
  popular: () => api.get("tv/popular"),
  airingToday: () => api.get("tv/airing_today"),
};

```

따로따로 api요청을 보내는것이 아닌 위와 같이 json에 funtion으로 값을 바로 넣어줄수가 있다.

```
  showDetail: (id) =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
```

위와 같이 사용한다면 각각의 api에 맞게 route나 params를 설정해 줄수 있다.

# container

클래스컴포넌트와 스테이트를 만들고 api에서 가져오는데 이것은 작은 프로젝트에서 사용할때 주로 쓰인다

## 리액트 컨테이너 프리젠터 패턴

- 컨테이너는 data를 가지고 state를 가지고, api를 불러온다.그리고 모든 로직을 처리함
- 프리젠터는 데이터를 보여줌 하지만 state를 가지고 있지도 않고 단순한 함수형 컴포넌트임
- 프리젠터는 스타일 컨테이더는 데이터임

index.js는 모든곳에서 만들어져야함

1개의 컨테이너는
index, container, presenter 로 이루어져 있다.

### container component

container는 상태(state)를 가지고 있다.

```
export default class extends React.Component {
  state = {
    nowPlaying: null,
    upcoming: null,
    popular: null,
    error: null,
    loading: true,
  };

  render() {
    const { nowPlaying, upcoming, popular, error, loading } = this.state;
    return (
      <HomePesenter
        nowPlaying={nowPlaying}
        upcoming={upcoming}
        popular={popular}
        error={error}
        loading={loading}
      />
    );
  }
}

```

위의 소스와 같이 가질수 있는 state들을 미리 정의를 해둔다
나중에 여기에 모든 로직을 추가할것이다
예를 들어서 에러 처리나 api전송과 같은 로직들은 container내부에서 처리하도록 한다

### Search container

```
import React from 'react';
import SearchPesenter from './SearchPesenter';

export default class extends React.Component {
  state = {
    movieResults: null,
    tvResult: null,
    serchTerm: '',
    error: null,
    loading: false,
  };

  render() {
    const { movieResults, tvResult, serchTerm, error, loading } = this.state;
    return (
      <SearchPesenter
        movieResults={movieResults}
        tvResult={tvResult}
        serchTerm={serchTerm}
        error={error}
        loading={loading}
      />
    );
  }
}

```

위와 같은 소스에서 ` movieResults: null, tvResult: null,` 둘다 들어가 있는 이유는'
검색을 했을시에 영화와 TV모두를 보여주고 싶기에 위와같이 적었다.

기본적으로 loading은 false가 될것이다.html의
searchTerm은 검색 기본값이 없음으로 empty이고, 검색하고 엔터를 누르면 로딩이 true고 그 결과값을
Result에 넣을것이다.

### DetailContainer

ID를 가지고 얻게되는 모든것들은 Result를 가지게 되고
같은 detail container를 사용한다

## compoentDidMount

**컴포넌트 생명주기**

모든 컴포넌트는 여러 종류의 “생명주기 메서드”를 가지며, 이 메서드를 오버라이딩하여 특정 시점에 코드가 실행되도록 설정할 수 있습니다.

아래 메서드들은 컴포넌트의 인스턴스가 생성되어 DOM 상에 삽입될 때에 순서대로 호출됩니다.

constructor()
static getDerivedStateFromProps()
render()
**componentDidMount()**

위와같이 만들어둔 api를 didmount에서 가져올수 있다.

### Object Deconstruction (객체 비구조화)

`const nowPlaying = await moviesApi.nowPlaying();` 이와 같이 api를 통해서
가져오는 데이터를 분해하여 할당하는 것을 말한다.

`const { data: { results }} = await moviesApi.nowPlaying();`
위와 같이 object로 구조화 되어있는 결과값을 **분해하여서 할당하는것을 말한다.**

`const { data: { results: nowPlaying }} = await moviesApi.nowPlaying();`
위와 같이 naming을 해주면 할당과 동시에 이름을 재지정 해줄수 있다.

### 자바스크립트 할당

```
  this.setState({
        nowPlaying: nowPlaying,
      });
```

위와 같은표현을 짧게 만들어 줄수 있다

```
      this.setState({
        nowPlaying,
      });
```

자바스크립트는 위와 아래를 같은것으로 인식한다.
