import React from 'react';
import ReactDOM from 'react-dom';

import './Editor.css';

class Line extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      number : props.number,
      children : props.children
    }
  }
  render(){
    return (
      <div className="Line" >
        <div className="Line-left-margin">
          <span className="Line-number">{this.props.number}</span>
          <span className="Line-bullet">b</span>
        </div>
          {
            this.props.children.length > 0 ?
              this.props.children :
              <Word content="Sample Content"/>
          }
      </div>
    );
  }
}

class Word extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      content : props.content
    }
  }
  render(){
    return (
      <span className="Word">
        {this.props.content}
      </span>
    );
  }
}

class Space extends React.Component{
  render(){
    return (<span className="Space"></span>);
  }
}

class TextBlock{
  constructor(content){
    this.content = content;
  }
}
class Editor extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      text : "Nice to meet you, sir",
      textBlocks : [],
      mouseX : -1,
      mouseY : -1
    };
    this.keyUp = this.keyUp.bind(this);
    this.mouseClick = this.mouseClick.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
  }

  render() {
    let rendered = this._renderTextBlocks();
    return (
      <div>
        <section className="Editor"
          onKeyUp={this.keyUp}
          onClick={this.mouseClick}
          onMouseMove={this.mouseMove} onMouseLeave={this.mouseLeave}>
          {rendered}
        </section>
        <span>{this.state.mouseX} : {this.state.mouseY}</span>
      </div>
    );
  }

  //Editor Functions
  addText(text){
    this.setState(function(prevState, props){
      let textBlocks = prevState.textBlocks;
      textBlocks.push(new TextBlock(text));
      console.dir(textBlocks);
      return {textBlocks : textBlocks}
    });
  }
  _renderTextBlocks(){
    let textBlocks = this.state.textBlocks;
    let lineComponents = [];
    if(textBlocks.length === 0){
      return <Line number={1} children={[]}/>
    }
    let currentContent = "";
    let counter = 1;
    for(let i=0; i<textBlocks.length; i++){
      let textBlock = textBlocks[i];
      let lines = textBlock.content.split("${newLine}");
      if(currentContent!==null){
        lines = (currentContent+textBlock.content).split("${newLine}");
      }
      if(lines[0] === textBlock.content){
        currentContent += textBlock.content;
        continue;
      }
      for(let ii=0; ii<lines.length; ii++){
        let line = lines[ii];
        let words = [<Word content={line}/>];
        lineComponents.push(<Line number={counter} children={words}/>);
        counter++;
      }
    }
    if(lineComponents.length === 0){
      let words = [<Word content={currentContent}/>];
      lineComponents.push(<Line number={counter} children={[words]}/>);
    }
    return lineComponents;
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
    this.addText('Hey ${newLine}Hey Hey ');
    // console.dir(this.state.textBlocks);
  }

  //
  // //Mount
  componentWillMount(){
    // this.addLine();
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
