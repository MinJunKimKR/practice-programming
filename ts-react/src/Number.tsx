import React from 'react'
import styled from 'styled-components'

//테마를 상위에서 지정을 했기때문에 styled-component에서 props로 사용할수 있다.
const Container = styled.span<{isBlue : boolean}>`
    color : ${props =>(props.isBlue ? props.theme.blueColor : "black")};
`

interface  IProps{
    count:number
}

const Number:React.FunctionComponent<IProps> = ({count}) => 
<Container isBlue={count>10}>{count}</Container>

export default Number