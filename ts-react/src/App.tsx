import React, {Component} from 'react';
import Number from './Number';
import {Form, Input} from './input';

interface IState{
  counter : number;
  name:string;
}

class App extends Component <{}, IState>{ //Component의 경우 state와 props가 있다.
  state = {
    counter : 0,
    name:""
  }
  render() {
    const {counter,name} = this.state
    return (
      <div>
        <Form onFormSubmit={this.onFormSubmit}>
          <Input value={name} onChange={this.onChange}/>
        </Form>
      <Number count = {counter}/>
        <button onClick={this.add}> Add </button>
        </div>
      )
    };
    //SyntheticEvent객체를 통해서 이벤트를 받게된다.
    //https://ko.reactjs.org/docs/events.html 
    onChange = (event : React.SyntheticEvent<HTMLInputElement>)=>{
      console.log(event.target)
    }

    onFormSubmit =(event : React.FormEvent)=>{
      event.preventDefault()
    }

    add = () : void=> {
      this.setState(prev =>{
        return {counter : prev.counter + 1}
      })
    }
}

export default App;

