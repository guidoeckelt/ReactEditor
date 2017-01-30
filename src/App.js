import React from 'react';
import Editor from './Editor';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <span className="title">Welcome to React</span>
        </header>
        <main className="App-main">
          <Editor who="Guido" className="pane"/>
          <div className="pane"></div>
        </main>
      </div>
    );
  }
}

export default App;
