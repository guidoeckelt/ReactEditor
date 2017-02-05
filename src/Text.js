import React from 'react';
import ReactDOM from 'react-dom';
import MarkdownViewer from './MarkdownViewer';

import './Text.css';

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
          <span className="Line-bullet">
            <i className="fa fa-angle-right" aria-hidden="true"></i>
          </span>
        </div>
          { this.props.children }
      </div>
    );
  }
}
  // {
  //   this.props.children.length > 0 ?
  //     this.props.children :
  //     <Word content="Sample Content"/>
  // }

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

class ToolButton extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      text : props.text,
      clicked : props.clicked
    }
  }
  render(){
    return (
      <button className="ToolButton" onClick={this.state.clicked}>
        <span>
          {this.state.text}
        </span>
      </button>
    );
  }
}
class TextBlock{
  constructor(content){
    this.content = content;
    this.leftContent = null;
  }

  cover(leftContent){
    this.leftContent = leftContent;
  }
  renderLines(currentCounter){
    let lineComponents = [];
    let counter = currentCounter;
    let content = this.content;
    if(this.leftContent!==null){
      content = this.leftContent + content;
    }
    let lines = content.split("\\newLine");
    if(lines[0] === this.content){
      return this.content;
    }
    if(lines[lines.length-1]===""){
      this.leftContent = "";
      lines.splice(lines.indexOf(lines.length-1),1);
    }
    for(let ii=0; ii<lines.length; ii++){
      let line = lines[ii];
      let wordArr = line.split(" ");
      let text = [];
      for(let iii=0; iii<wordArr.length; iii++){
        if(wordArr[iii] === "") continue;
        let word = <Word content={wordArr[iii]}  key={"Line-"+counter+"-Word-"+iii}/>;
        text.push(word);
        if(iii === wordArr.length-1) continue;
        text.push(<Space key={"Line-"+counter+"-Space-"+iii}/>);
      }
      lineComponents.push(<Line number={counter} children={text}  key={"Line-"+counter}/>);
      counter++;
    }

    if(lineComponents.length === 0){
      let words = [<Word content={this.content}/>];
      lineComponents.push(<Line number={counter} children={[words]}/>);
    }
    return lineComponents;
  }
}
class TextEditor extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      text : props.text?props.text:"Nice to meet you, sir",
      textBlocks : [],
      mouseX : -1,
      mouseY : -1
    };
    this.exampleText = this.exampleText.bind(this);
    this.keyUp = this.keyUp.bind(this);
    this.keyDown = this.keyDown.bind(this);
    this.mouseClick = this.mouseClick.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
  }

  render() {
    let renderedLines = this._renderTextBlocks();
    return (
        <section className="Editor"
        onKeyUp={this.keyUp} onKeyDown={this.keyDown} //onClick={this.mouseClick}
        onMouseMove={this.mouseMove} onMouseLeave={this.mouseLeave}>
          <div className="ToolBox">
            <div className="ToolButtonBar"></div>
            <div className="ToolButtonBar">
              <ToolButton text="HAHA" clicked={this.exampleText}/>

            </div>
          </div>
          <div className="LineBox">
            {renderedLines}
          </div>
          <span>{this.state.mouseX} : {this.state.mouseY}</span>
        </section>
    );

  }
  _renderTextBlocks(){
    let textBlocks = this.state.textBlocks;
    let lineComponents = [];
    if(textBlocks.length === 0){
      return <Line number={1} children={[]}/>
    }
    let leftContent = null;
    let counter = 1;
    for(let i=0; i<textBlocks.length; i++){
      let textBlock = textBlocks[i];
      if(leftContent!==null){
        textBlock.cover(leftContent);
        leftContent = null;
      }
      let newLines = textBlock.renderLines(counter);
      if(!(newLines instanceof Array)){
        // console.log("newLines kein array");
        leftContent = newLines;
        continue;
      }
      if(textBlock.leftContent!==null){
        leftContent = textBlock.leftContent;
        if(i === textBlocks.length-1){
          newLines.push(<Line number={counter+newLines.length} children={""}  key={"Line-"+(counter+newLines.length)}/>);
        }
      }
      counter += newLines.length;
      lineComponents = lineComponents.concat(newLines);
    }
    if(lineComponents.length === 0){
      // console.log("keine lineComponents");
      let words = [<Word content={leftContent}/>];
      lineComponents.push(<Line number={counter} children={[words]}/>);
    }
    // console.dir(lineComponents);
    return lineComponents;
  }

  //Editor Functions
  addText(text){
    this.setState(function(prevState, props){
      let textBlocks = prevState.textBlocks;
      textBlocks.push(new TextBlock(text));
      // console.dir(textBlocks);
      return {textBlocks : textBlocks}
    });
  }
  // _replaceText(text){
  //   let replacedText = text.replace(new RegExp("\n"),"{{newLine}}");
  // }
  exampleText(){
    this.addText(this.state.text+"\\newLine");
    // this.addText('Hey \\newLineHey Hey');
    // console.dir(this.state.textBlocks);
  }
  //Event Handler
  keyUp(event){
    let keyCode = event.which;
    let key = event.key;
    console.log(key+' '+keyCode);
  }
  keyDown(event){
    // let keyCode = event.which;
    // let key = event.key;
    // console.log(key+' '+keyCode);
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

  }

  // //Mount
  componentWillMount(){
    this.addText(this.state.text);
    // this.addText(this.state.text);
    // let replacedText = this._replaceText(this.state.text);
    // this.addText(replacedText);
    // this.addText('Hey {{newLine}}Hey Hey');
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


export const Text = {
  Editor : TextEditor,
  Block : TextBlock,
  Line : Line,
  Word : Word,
  Space : Word,
  editText(text, container){
    ReactDOM.render(
      <TextEditor text={text}/>,
      document.getElementById(container)
    );

  },
  viewMarkdownInto(container){
    ReactDOM.render(
      <MarkdownViewer />,
      document.getElementById(container)
    );
  }
};
// export default TextEditor;
