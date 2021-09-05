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

```react
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
const globalStyle = createGlobalStyle`

`;
```

# React-router

URL에 # 라고 나오는게 hash route를 쓰기 떄문이다

```react
export default () => (
  <Router>
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </>
  </Router>
);
```

`<></>`로 깜싼이유는 리액트는 1개의 child만 return 할수 있어서다.

위에서 보는것과 같이 Route tag로 지정을해주면, 어떤 component를 랜더링 해줄것지 지정해 줄수있다.



## Browser router

원래의 웹사이트 처럼 보여준다 : HTML history를 쓴다

## Hash router

- url이 이쁘진 않다.

- 웹이아닌 앱에 있다는 느낌을 준다



## Composition

composition은 두개 이상의 라우트로 랜더링 하는 방법이다

예를 들어 TV안에 tab 들이 있다고가정해 보자

```react
export default () => (
  <Router>
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/tv"  component={Tv} />
        <Route path="/tv/popular" render={()=><h1>Popular</h1>}/>
      </Switch>
    </>
  </Router>
);
```

만일 `/tv/popular`로 접근하면 어떻게 될까? 정답은 tv와 tv/popular **2개의 component가 전부 적합하기 때문에 둘다 랜더링**이된다.



```react
<Redirect from="*" to="/" />
```

위의 Redirect 태그는 매칭이 아무것도 안될때에는  `/`으로 리다이렉트 시킬려고한다.

하지만 같은 route로 render를 하려고 하면 에러가 나는데 이는, 위에서 한것처럼 composition error가 나기 때문이다.

이것을 해결해 주기위하여 **Switch태그를** 사용한다

**switch는 1개의 ruote만 render되게 해준다.**

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



https://flatuicolors.com/palette/defo

`border-bottom: 5px solid ${(props) => (props.current ? '#3498db' : 'transparent')}; `

위와 같이 props를 SC내에서 사용할수 있으며, render를 할떄에

`<Item current={true}>` 이와 같이 props값을 전달해 줄수 있다.

## withRouter

withRouter는 다른 컴포넌트를 감싸는 컴포넌트다.

그리도 꼬한 Router에 정보를 전달해 준다.

```react
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
const Header = () => (
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
export default withRouter(Header);
```

위와 같은형태이기에 **props를 가질수 있게 된다.**

**즉, WithRouter를 쓰면 router 에서 값을 가져와서 props에서 쓸수 있게된다.**



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

api.js 이라는 파일을 만들어서 **api와 통신하는 코드를 몰아 넣을것이다.**

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

컨테이너는 **클래스컴포넌트와 스테이트를 만들고** api에서 가져오는데 이것은 작은 프로젝트에서 사용할때 주로 쓰인다



## 리액트 컨테이너 프리젠터 패턴

- **컨테이너는 data를 가지고 state를 가지고, api를 불러온다**.그리고 **모든 로직을 처리함**
- **프리젠터는** **데이터를 보여줌 하지만 state를 가지고 있지도 않고 단순한 함수형 컴포넌트임**
- **프리젠터는 스타일, 컨테이더는 데이터**임

index.js는 모든곳에서 만들어져야함

1개의 컨테이너는
index, container, presenter 로 이루어져 있다.

## container component

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

예를 들어서 에러 처리나 api전송과 같은 로직들은 container내부에서 처리하도록 한다.

그리고 난다음에 `render`에서 보이는것과 같이 `presenter`에 container에서 얻은 데이터를 전달아여 준다.



## Search container

```
import React from 'react';
import SearchPesenter from './SearchPesenter';

export default class extends React.Component {
  state = {
    movieResults: null,
    tvResult: null,
    searchTerm: '',
    error: null,
    loading: false,
  };

  render() {
    const { movieResults, tvResult, searchTerm, error, loading } = this.state;
    return (
      <SearchPesenter
        movieResults={movieResults}
        tvResult={tvResult}
        searchTerm={searchTerm}
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

## DetailContainer

ID를 가지고 얻게되는 **모든것들은 Result를 가지게 되고** 같은 **detail container**를 사용한다

### compoentDidMount

**컴포넌트 생명주기**

**모든 컴포넌트는 여러 종류의 “생명주기 메서드”를 가지며**, 이 메서드를 오버라이딩하여 특정 시점에 **코드가 실행되도록 설정할 수 있습니다.**

아래 메서드들은 **컴포넌트의 인스턴스가 생성되어 DOM 상에 삽입될 때에 순서대로 호출**됩니다.

constructor()
static getDerivedStateFromProps()
render()
**componentDidMount()**

위와같이 만들어둔 api를 didmount에서 가져올수 있다.

### Object Deconstruction (객체 비구조화)

`const nowPlaying = await moviesApi.nowPlaying();` 

위와 같이 평소에 사용하는 방법이아닌,

`const { data: { results }} = await moviesApi.nowPlaying();`
이와 같이 object로 구조화 되어있는 결과값을 **분해하여서 할당하는것을 말한다.**

`const { data: { results: nowPlaying }} = await moviesApi.nowPlaying();`

또한, 위와 같이 naming을 해주**면 할당과 동시에 이름을 재지정 해줄수 있다.**

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

## SearchContainer

### handleSubmit

누군가가 **폼에서 text를 입력하고 엔터를 누르면, 그게 handleSubmit이 되는것이다.**

```
import { moviesApi, tvApi } from 'api';
import React from 'react';
import SearchPesenter from './SearchPesenter';

export default class extends React.Component {
  state = {
    movieResults: null,
    tvResults: null,
    searchTerm: '',
    error: null,
    loading: false,
  };

  handleSubmit = () => {
    const { searchTerm } = this.state;
    if (searchTerm !== '') {
      this.searchByTerm();
    }
  };

  searchByTerm = async () => {
    const { searchTerm } = this.state;
    try {
      this.setState({ loading: true });
      const {
        data: { results: movieResults },
      } = await moviesApi.search(searchTerm);
      const {
        data: { results: tvResults },
      } = await tvApi.search(searchTerm);
      this.setState({
        movieResults,
        tvResults,
      });
    } catch {
      this.setState({ error: "Can't find results" });
    } finally {
      this.setState({ loading: false });
    }
  };
  render() {
    const { movieResults, tvResults, searchTerm, error, loading } = this.state;
    return (
      <SearchPesenter
        movieResults={movieResults}
        tvResults={tvResults}
        searchTerm={searchTerm}
        loading={loading}
        error={error}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

```

위와 같은 코드에서 **searchPresenter에서 form을 만들고, onSubmit을 호출하게되면**
**handleSubmit이 작동이 된다.**

이때 container에서 미리 정의해준 handleSubmit을 presenter에게 전달해준다.

## detail

react router 각 parameter를 각각의 다른장소에게 전달해준다.

```

export default () => (
  <Router>
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/tv" exact component={TV} />
        <Route path="/search" component={Search} />
        <Route path="/movie/:id" component={Detail} />
        <Route path="/show/:id" component={Detail} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </Router>
);
```

위에서 movie와 show부분에 :id를 사용했기에, props를 movie에서 확인해보면 id에 parameter가 담겨오게된다.

```
  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      push("/");
    }
  }

```

위와 같이 **history의 push를 사용해서 숫자가 아니라면 home으로 보낼수 있다.**

```
    this.isMovie = pathname.includes("/movie/");
```

만일 랜더링할 필요가 없으면 class안에 둘수도 있다.

랜더링 할 필요가 있다면 state에 두면 된다.



### class생성

```
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = props;
    this.state = {
      result: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie/"),
    };
  }
```

위와같은 방법으로 class를 생성해줄수 있다.

위와같은 방법으로 바뀌게 된다면 아래와 같이 isMovie도 바꿔 줄수있다.

```

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;
    const parsedId = parseInt(id);
    const { isMovie } = this.state;
    if (isNaN(parsedId)) {
      return push("/");
    }
  }

```



### 축약형

```
        const request = await moviesApi.movieDetail(parsedId);
        result = request.data;
```

위와 같이 api에서 result를 받아올수 있다 하지만, cosnt를 한번더 선언을 해야하는것은 약간의 불편함이 있다.

따라서 아래와 같이 바꿔주면 훨씬 깔끔하게 짤수가 있다

```

        ({
          data:  result ,
        } = await moviesApi.movieDetail(parsedId));
```

data를 return 해주는데 이것을 result로 해주는 것이다.

# Presenter

Container에서 로직을 구현한다고 한다면
Presenter는 로직의 결과를 보여주는 파트이다. 즉, 도면을 그리는것과 같다.

그렇기에 index.js에서 container를 import하고, container는 presenter를 import해서 사용한다.

```
  render() {
    console.log(this.state);
    const { result, error, loading } = this.state;
    return <DetailPesenter result={result} error={error} loading={loading} />;
  }
```

위에서와 같이 DetailPesenter에 container의 render에서 return을 해주는데, 여기에 loading, error와 같은 값을 던져준다.
이떄 state가 변경될때마다 reder를 해주게된다.

이떄, DetailPresenter는 아래와 같다

```
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const DetailPresenter = ({ result, error, loading }) => null;

DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default DetailPresenter;

```

propTypes를 사용하여서, 넘어오는 데이터가 유효한지를 validate할수가 있다.

## section

```
const Section = ({ title, children }) => (
  <Container>
    <Title>{title}</Title>
    <Grid>{children}</Grid>
  </Container>
);

Section.proTypes = {
  title: ProTypes.string.isRequired,
  children: ProTypes.oneOfType([
    ProTypes.arrayOf(ProTypes.node),
    ProTypes.node,
  ]),
};
```

위와 같이 styled component를 적용해서 Section을 만들었다.

위에서 만들어진 Section은 component로서 어디서든 재활용이 가능해 졌다.
이제 이것을 HomePresenter에 import해서 사용할것이다.

```
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Section from "Components/Section";

const Container = styled.div`
  padding: 0px 10px;
`;

const HomePresenter = ({ nowPlaying, popular, upcoming, error, loading }) =>
  loading ? null : (
    <Container>
      {nowPlaying && nowPlaying.length > 0 && (
        <Section title="Now Playing">
          {nowPlaying.map((movie) => movie.title)}
        </Section>
      )}
      {upcoming && upcoming.length > 0 && (
        <Section title="Upcoming Movies">
          {upcoming.map((movie) => movie.title)}
        </Section>
      )}
      {popular && popular.length > 0 && (
        <Section title="popular Movies">
          {popular.map((movie) => movie.title)}
        </Section>
      )}
    </Container>
  );

HomePresenter.propTypes = {
  nowPlaying: PropTypes.array,
  popular: PropTypes.array,
  upcoming: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default HomePresenter;

```

위에서 보는것과 같이 component인 Section을 가져와서
각각, 상영중, 새영화, 유명한 영화 3가지 테마를 같은 component로 사용할수가 있고,
이로서 재활용이 된다.

또한, Continer에 css를 주어서 같은 Component를 쓴다 할지라도 Home에서만 적용되는 스타일을
별도로 지정할수 있게되서 캡슐화가 가능해진다.

여기서 포인트는 **children은 반드시 tag사이에 넣어줘야 한다.**

```
upcoming && upcoming.length > 0 && (
        <Section title="Upcoming Movies">
          {upcoming.map((movie) => movie.title)}
        </Section>
```

위에서 && &&를 써준이유는 해당데이터가 없을경우에는 출력을 해주면 안되기에
트리플 체크를 해준것이고, 잘보면 `{upcoming.map((movie) => movie.title)}`
는 `<Section>` 태그 사이에 위치한다는것을 알수가 있다.


## Loader

그 동안은 Loader가 존재하지 않아서 리스트를 불러올때 깜빡이는 효과가 있었지만,
Loader를 사용하면 로딩이 되는 순간에 보여줄수 있는 것을 추가해 줄수가 있다.

```
const Continer = styled.div`
height : 100vh;
width:100vw;
display : flex;
justify-content : center;
font-size : 28px;
margin-top : 20px;
`

export default () => (<Continer><span role="img" aria-label="Loading">⏰</span></Continer>)

```

위와같이 정말 간단한 로더를 생성하였다.
이 로더는 공용사용임으로 component에 들어가 있다.

이제, 이 Loader를 Presenter가 사용을 하게되는데, 

```
const HomePresenter = ({ nowPlaying, popular, upcoming, error, loading }) =>
  loading ? <Loader />  : (
    <Container>
      {nowPlaying && nowPlaying.length > 0 && (
        <Section title="Now Playing">
          {nowPlaying.map((movie) => <span key = {movie.id}>{movie.title}</span>)}
        </Section>
      )}
      {upcoming && upcoming.length > 0 && (
        <Section title="Upcoming Movies">
          {upcoming.map((movie) => <span key = {movie.id}>{movie.title}</span>)}
        </Section>
      )}
      {popular && popular.length > 0 && (
        <Section title="popular Movies">
          {popular.map((movie) => <span key = {movie.id}>{movie.title}</span>)}
        </Section>
      )}
    </Container>
  );
```


위의 소스에서 원래는 `loading? null : (..... )` 과 같이 loading 이 아무것도 안되었다면 안보여줬지만

지금은 Loader가 생성이 되었기 때문에 추가되었다.

### Grid

```
const Grid = styled.div`
  margin-top: 25px;
  display : grid;
  grid-template-columns:repeat(auto-fill, 125px);
  grid-gap : 25px;
`;
```
grid는 flex box보다 훨씬 좋다.
격자로 구성되며 gap을 써서 사이의 간격을 넓혀 주거나 할수있다.

## Input

Input에서 타이핑을 한다고 Input내에 글자가 쳐지지는 않는다.

이유는, **타이핑을 하는 update에 해당하는 처리가 추가적으로 필요하기 떄문이다.**
또한, Enter를 누르게되면 browser가 refresh되면서 타이핑해놓은 내용이 전부다 없어지게 되는데, 이유는 **새로고침이 되면 state를 잃어 버리기 때문이다.**
이것을 유지 시키기 위해서 별도의 처리가 필요하다.

바로, 이벤트를 중간에 가로채는것이다.

```

  handleSubmit = () => {
    const { searchTerm } = this.state;
    if (searchTerm !== "") {
      this.searchByTerm();
    }
  };

```

위의 내용은 form에서 엔터를 치면 동작하는 summit event를 수행하는 핸들러이다.

```

  handleSubmit = (event) => {
    event.preventDefault();
```

위와 같이 event를 preventDefault를 사용해서 가로채서 이벤트를 없애는 작업이 반드시 필요하다.

### all:unset;

우리는 Input과 같은 html기본 형태를 바꾸고 싶을때가 있다.
왜냐면 기본형태는 우리가 원하는 형태랑 다소 달라서 보기가 안좋기 때문이다.
이럴떄 All:unset을 사용해주면 기본 형태가 전부 해제된다.

```
const Input = styled.input`
all:unset;
font-size : 28px;
width : 100%;
`
```





## Key

react에서 Key는 컴포넌트 배열을 랜더링 했을때 원소의 변동을 알아내기위하여 사용한다.

Key를 사용하면 react에서 엘리멘트 들의 변화를 좀더 빠르게 알수 있어서, 전체를 랜더링 하는 일이 없게 만들어 준다.

  



----



https://googleads.g.doubleclick.net/pagead/id net::ERR_BLOCKED_BY_CLIENT



https://velog.io/@gojaegaebal/210401-%EA%B0%9C%EB%B0%9C%EC%9D%BC%EC%A7%80115%EC%9D%BC%EC%B0%A8-Youtube-api%EB%A1%9C-%EC%98%81%EC%83%81-%EA%B0%80%EC%A0%B8%EC%98%AC-%EB%95%8C-GET-https-googleads.g.doubleclick.netpageadid-netERRBLOCKEDBYCLIENT-%EB%B0%8F-Failed-to-load-resource-googleads.g.doubleclick.netpaged-%EC%97%90%EB%9F%AC-%EB%B0%9C%EC%83%9D-%EC%9D%B4%EC%9C%A0







https://kss7547.tistory.com/36