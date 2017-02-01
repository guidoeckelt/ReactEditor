import React from 'react';
import ReactDOM from 'react-dom';

import './Editor.css';

class Line extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      number : props.number,
      textBlocks : props.textBlocks
    }
  }
  render(){
    return (
      <div className="Line" >
        <div className="Line-left-margin">
          <span className="Line-number">{this.state.number}</span>
          <span className="Line-bullet">b</span>
        </div>
          {
            this.state.textBlocks.length > 0 ?
              this.state.textBlocks :
              <TextBlock content="Sample Content"/>
          }
      </div>
    );
  }
  //Line Functions
  appendTextBlock(newTextBlock){
    this.setState(function(prevState,props){
      let textBlocks = prevState.textBlocks;
      textBlocks.push(newTextBlock);
      return {textBlocks : textBlocks};
    });
  }
}
class TextBlock extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      content : props.content
    }
  }
  render(){
    return (
      <span className="TextBlock">
        {this.state.content}
      </span>
    );
  }
}

class Editor extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      text : "Nice to meet you, sir",
      lines : [],
      lineComponents : [],
      lineCounter : 0,
      mouseX : -1,
      mouseY : -1
    };
    this.keyUp = this.keyUp.bind(this);
    this.mouseClick = this.mouseClick.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
  }

  render() {
    let lines = this.state.lines;
    return (
      <div>
        <section className="Editor"
          onKeyUp={this.keyUp}
          onClick={this.mouseClick}
          onMouseMove={this.mouseMove} onMouseLeave={this.mouseLeave}>

          {lines}
        </section>
        <span>{this.state.mouseX} : {this.state.mouseY}</span>
      </div>
    );
  }

  //Editor Functions
  addLine(content){
    let editor = this;
    let counter = this.state.lineCounter+1;
    let lines = this.state.lines;
    let lineComponents = this.state.lineComponents;
    let number = lines.length+1;
    let textBlocks = [];
    let element = <Line number={number} textBlocks={textBlocks} key={counter}
                ref={function(line){
                  lineComponents.push(line);
                  editor.setState({lineComponents : lineComponents});
                }}/>
    lines.push(element);
    this.setState({
      lines : lines,
      lineCounter : counter
    });
  }

  //Event Handler
  keyUp(event){
    let keyCode = event.which;
    let key = event.key;
    console.log(key+' '+keyCode);
  }

  mouseMove(event){
    // let buttons = event.buttons;
    let element = ReactDOM.findDOMNode(this);
    // let element = event.target;
    let x = event.clientX - element.getBoundingClientRect().left;
    let y = event.clientY - element.getBoundingClientRect().top;
    // console.log(buttons+' '+x+':'+y);
    this.setState({
      mouseX : x,
      mouseY : y
    })
  }
  mouseLeave(){
    this.setState({
      mouseX : -1,
      mouseY : -1
    });
  }
  mouseClick(event){
    // this.addLine();
    let line = this.state.lineComponents[0]
    console.log(line.state.textBlocks);
    let text = <TextBlock content="I clicked hihi "/>;
    line.appendTextBlock(text);
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
