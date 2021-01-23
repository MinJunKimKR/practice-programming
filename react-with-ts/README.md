# index.js

가장 상위의 파일
실제 랜더링 되는 components를 import해서 사용한다

# Component

component를 쓰는 이유는 어플리케이션의 부분부분을 캡슐화 해서 쓰기 위해서
그렇기 떄문에 ja, logic, html, css도 한 곳에 모으고 싶은것.

folder를 만든후 css와 필요한결 다같이 넣는방법의 문제점은 classname을 기억해야하고,
사용할때마다 Import해줘야하고 class name이 중복이 되면 안됨

왜냐면 지금 Css 는 global로 작동한 띠라서 우리의component에서만 작동하는 css를 만들어야함

# css module

## 3.1~

css 가 module화 시키는것
RCA 에서는 css naming 을 Header.module.css 와 같이 하면됨.
이후 js 처럼 import styles from './Header.module.css';
그리고 적용하는 위치에서는 `<ul className={styles.navList}>` 와 같이 쓴다
이런 방법을 쓰면 실제 랜더링 되었을떄 classname이 자동 변경된다

하지만 여전히 classname 을 기억해야 한다는 단점이 있다
그렇기에 하나의 파일로 합치고 싶다. + className을 기억하고 싶지않다.

# styled-component

## 3.3

`import styled from 'styled-components';`
const List = styled.ul` display: flex; &:hover { background-color: blue; }`;

위와 같은 소스를 추가한후 (여기에서 List는 ul이 된다.)

```
<header>
    <List>
      <li>
```

기존의 ul이 있던자리에 넣으면 잘 적용이 된다
`<a href="/">Movies</a>` 의 방식을 사용하지 않기 위하여
`import {Link} from 'react-router-dom'`
을 사용할 것이다.
Link 는 페이지 내의 링크가 존재한다면 브라우저한 방식일 아닌 JS한 방싱으로 가게 해준다
`<SLink to="/">Movies</SLink>` 이렇게 바꿔주자.
여기서 Link 는 Rotuter-dom에서 가져온 것이기에 ` const SLink = styled(Link)``;  `로 써준다,

다만 이때 Header에서 Route-dom을 쓰게 되는데 Route dom은 Router밖에 존재할수 없기 떄문에
Router 내부의 Route로 들어가게된다.
이때, only one child의 원칙에 따라 `<></>` 을 써서 Switch부분과 Header를 1개의 child로 묶어준다

# App.js

민들어둔 헤더를 import 하면 router 밖에 있기 때문에 항상 노출이 된다
여러개의 리턴을 위하여 flagment를 쓴다

# Header

index.js파일을 넣고 header 파일을 굳이 import시키는 이유는
App.js에서 `import Header from 'Components/Header'; `와 같이 import해주고 싶기때문

# route

URL에 # 라고 나오는게 hash route를 쓰기 떄문임
`<></>`로 깜싼이유는 1개의 child만 return 할수 있어서임

### Browser router

원래의 웹사이트 처럼 보여준다 : HTML history를 쓴다

### Hash router

url이 이쁘진 않음, 웹이아닌 앱에 있다는 느낌을 준다 : hash를 쓴다

Composition은 두개 이상의 라우트로 랜더링 하는 방법임
-> 예를 들어 TV안에 tab 들이 있을떄 (/tv/popular)쓸수있다
이때 2개의 component가 전부 적합하기 때문에 둘다 랜더링이된다.

Redirect 는 아무곳도 아닐떄 /으로 리다이렉트 시킬려고한다
하지만 같은 route로 render를 하려고 하면 에러가 나는데 이는, 위에서 한것처럼 composition error가
나기 때문이다. 이것을 해결해 주기위하여 Switch를 사용한다

switch는 1개의 ruote만 render되게 해준다
하지만 이결우에 아까 만든 popular가 같이 보이지 않게 해준다 exact를 넣어주면 정확히 같을때만 랜더된다
