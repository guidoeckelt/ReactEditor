import React from 'react';
import { Text } from './Text';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {

  componentWillMount(){

  }
  componentDidMount(){
    Text.editText("HAHAHAHhA","teViewer");
    Text.viewMarkdownInto("mdViewer");
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <span className="title">Welcome to my ReactTextEditor</span>
        </header>
        <main className="App-main">
          <div className="pane">
            <Text.Editor text="HAHA\newLineHAHAHHAHA"/>
          </div>
          <div id="teViewer" className="pane"></div>
          <div id="mdViewer" className="pane"></div>
        </main>
      </div>
    );
  }
}

export default App;
