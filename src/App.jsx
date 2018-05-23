import React from 'react';
import ReactDOM from 'react-dom';
import { FloVisualizer } from "./index.js";
//-----------------------------------------------------------------------------
export class MyNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return <div>
      <div> Node Data </div>
    </div>;
  }
}

export class ExampleApp extends React.Component {
  constructor(props) {
    super(props);
  }

  addNode() {
    return <MyNode/>;
  }

  render() {
    return <div>
      <FloVisualizer fcbNode={this.addNode.bind(this)} connectorColor="#0091ef" connectorTension="0.6" />
    </div>;
  }
}

ReactDOM.render(<ExampleApp />, document.getElementById('react-div'));
