import React from 'react';
import ReactDOM from 'react-dom';

import './Editor.css';

class Line extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      number : props.number
    }
  }
  render(){
    return (
      <div className="Line" >
        <div className="Line-left-margin">
          <span className="Line-number">{this.state.number}</span>
          <span className="Line-bullet">b</span>
        </div>
        this is a line
      </div>
    );
  }
}

class Editor extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      text : "Nice to meet you, sir",
      lines : [],
      lineCounter : 0
    };
    this.keyUp = this.keyUp.bind(this);
    this.mouseMoved = this.mouseMoved.bind(this);
    this.mouseClick = this.mouseClick.bind(this);
  }

  render() {
    let lines = this.state.lines;
    return (
      <div>
        <section className="Editor"
          onKeyUp={this.keyUp}
          onMouseMove={this.mouseMoved} onClick={this.mouseClick}>

          {lines}
        </section>
        <span>{this.state.mouseX} : {this.state.mouseY}</span>
      </div>
    );
  }

  //Editor Functions
  addLine(content){
    this.setState(function(prevState, props){
      let counter = prevState.lineCounter+1;
      let lines = prevState.lines;
      let number = lines.length+1;
      lines.push(<Line number={number} key={counter}/>);
      return {lines : lines , lineCounter: counter}
    });
  }

  //Event Handler
  keyUp(event){
    let keyCode = event.which;
    let key = event.key;
    console.log(key+' '+keyCode);
  }

  mouseMoved(event){
    let buttons = event.buttons;
    let element = ReactDOM.findDOMNode(this);
    // let element = event.target;
    let x = event.clientX - element.getBoundingClientRect().left;
    let y = event.clientY - element.getBoundingClientRect().top;
    // console.log(buttons+' '+x+':'+y);
    this.setState({
      mouseX : x,
      mouseY : y,
      mouseButtons : buttons
    })
  }
  mouseClick(event){
    this.addLine();
  }

  //
  // //Mount
  componentWillMount(){
    this.addLine();
  }
  // componentDidMount(){
  //
  // }
  //
  // //Update
  // componentWillReceiveProps(){
  //
  // }
  // shouldComponentUpdate(){
  //   return true;
  // }
  // componentWillUpdate(){
  //
  // }
  // componentDidUpdate(){
  //
  // }
  //
  // //Unmount
  // componentWillUnmount(){
  //
  // }
}

export default Editor;
