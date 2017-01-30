import React from 'react';

import './Editor.css';


class Editor extends React.Component {
  render() {
    const rootClasses = 'Editor '+this.props.className;
    return (
      <div className={rootClasses}>
        Hello {this.props.who}, {this.state.sample}
      </div>
    );
  }
  //Mount
  constructor(props){
    super(props);
    this.state = {
      sample : "Nice to meet you,sir"
    };
  }
  componentWillMount(){

  }
  componentDidMount(){

  }

  //Update
  componentWillReceiveProps(){

  }
  shouldComponentUpdate(){

  }
  componentWillUpdate(){

  }
  componentDidUpdate(){

  }

  //Unmount
  componentWillUnmount(){

  }
}

export default Editor;
