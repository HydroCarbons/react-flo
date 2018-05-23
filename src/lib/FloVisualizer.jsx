import React from 'react';
import { Glyphicon } from 'react-bootstrap';

import Draggable, {DraggableCore} from 'react-draggable';

import FloNode from "./FloNode.jsx";
import styles from "../assets/css/style.css";

export default class FloVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			idx:0,
			outputClicked: false,
			nodeFrom: 0,
			nodeTo: 0,
			nodeMap: {},
			selectedNode: null,
      connectorColor: this.props.connectorColor,
      connectorTension: this.props.connectorTension,
    }
		this.inputClicked = this.inputClicked.bind(this);
		this.outputClicked = this.outputClicked.bind(this);
		this.nodeMove = this.nodeMove.bind(this);
		this.drawNodeConnectorX = this.drawNodeConnectorX.bind(this);

		this.onESCKey = this.onESCKey.bind(this);
		this.onClickComp = this.onClickComp.bind(this);
  }

	onESCKey(event){
    if(event.keyCode === 27) {
			var elm = document.getElementById(this.state.nodeFrom + "-" + "TEMP");
			if(elm) {
				elm.parentNode.removeChild(elm);
				this.setState({ outputClicked: false});
			}
    }
  }

	componentDidMount() {
		document.addEventListener("keydown", this.onESCKey, false);
	}

	drawNodeConnectorX(nodeFrom, nodeTo, color, tension) {
		var _NS_ = "http://www.w3.org/2000/svg";
    var svg = document.getElementById('svgCanvas');

		var nodeFrom_outport = document.getElementById( nodeFrom + "_OUTPORT" );
			var rectOutport = nodeFrom_outport.getBoundingClientRect();
			//console.log(rectOutport);
		var nodeTo_inport = document.getElementById( nodeTo + "_INPORT" );
			var rectInport = nodeTo_inport.getBoundingClientRect();
			//console.log(rectInport);

		var x1, y1, x2, y2;
		x1 = rectOutport.x + (rectOutport.width) + 15 ;
		y1 = rectOutport.y - (rectOutport.height) + 15 ;
		x2 = rectInport.x - (rectInport.width) - 10;
		y2 = rectInport.y - (rectInport.height) + 15;

		var g = document.createElementNS(_NS_, "g");
			g.setAttributeNS(null, "id", nodeFrom + '-' + nodeTo);
			g.setAttributeNS(null, "class", "svgLine");

		var shape = document.createElementNS(_NS_, "path");
	    var delta = (x2-x1)*tension;
	    var hx1=x1+delta;
	    var hy1=y1;
	    var hx2=x2-delta;
	    var hy2=y2;
	    var path = "M "  + x1 + " " + y1 + " C " + hx1 + " " + hy1 + " "  + hx2 + " " + hy2 + " " + x2 + " " + y2;

			shape.setAttributeNS(null, "id", "LINE-" + nodeFrom + '-' + nodeTo);
	    shape.setAttributeNS(null, "d", path);
	    shape.setAttributeNS(null, "fill", "none");
	    shape.setAttributeNS(null, "stroke", color);
			shape.setAttributeNS(null, "stroke-width", "6");
    	g.appendChild(shape);

		var c1 = document.createElementNS(_NS_, "circle");

	    c1.setAttributeNS(null, "cx", x1);
	    c1.setAttributeNS(null, "cy", y1);
	    c1.setAttributeNS(null, "r",  10);
	    c1.setAttributeNS(null, "fill", color);
			c1.setAttributeNS(null, "stroke", color);
			c1.setAttributeNS(null, "stroke-width", "6");
	    g.appendChild(c1);

		var c2 = document.createElementNS(_NS_, "circle");
	    c2.setAttributeNS(null, "cx", x2);
	    c2.setAttributeNS(null, "cy", y2);
	    c2.setAttributeNS(null, "r",  10);
	    c2.setAttributeNS(null, "fill", color);
			c2.setAttributeNS(null, "stroke", color);
			c2.setAttributeNS(null, "stroke-width", "6");
	    g.appendChild(c2);

			svg.appendChild(g);

			svg.addEventListener('click', function(e) {
				console.log("selectedNode : " + nodeFrom + '-' + nodeTo);
			});
	}

	drawTempNodeConnector(nodeFrom, x2, y2, color, tension) {
		var _NS_ = "http://www.w3.org/2000/svg";
    var svg = document.getElementById('svgCanvas');

		var nodeFrom_outport = document.getElementById( nodeFrom + "_OUTPORT" );
			var rectOutport = nodeFrom_outport.getBoundingClientRect();
			//console.log(rectOutport);

		var x1, y1;
		x1 = rectOutport.x + (rectOutport.width) + 15 ;
		y1 = rectOutport.y - (rectOutport.height) + 15 ;

		var g = document.createElementNS(_NS_, "g");
			g.setAttributeNS(null, "id", nodeFrom + '-' + "TEMP");

		var shape = document.createElementNS(_NS_, "path");
	    var delta = (x2-x1)*tension;
	    var hx1=x1+delta;
	    var hy1=y1;
	    var hx2=x2-delta;
	    var hy2=y2;
	    var path = "M "  + x1 + " " + y1 + " C " + hx1 + " " + hy1 + " "  + hx2 + " " + hy2 + " " + x2 + " " + y2;

			shape.setAttributeNS(null, "id", "LINE-" + nodeFrom + '-' + "TEMP");
	    shape.setAttributeNS(null, "d", path);
	    shape.setAttributeNS(null, "fill", "none");
	    shape.setAttributeNS(null, "stroke", color);
			shape.setAttributeNS(null, "stroke-width", "6");
    	g.appendChild(shape);

		var c1 = document.createElementNS(_NS_, "circle");

	    c1.setAttributeNS(null, "cx", x1);
	    c1.setAttributeNS(null, "cy", y1);
	    c1.setAttributeNS(null, "r",  10);
	    c1.setAttributeNS(null, "fill", color);
			c1.setAttributeNS(null, "stroke", color);
			c1.setAttributeNS(null, "stroke-width", "6");
	    g.appendChild(c1);

		var c2 = document.createElementNS(_NS_, "circle");
	    c2.setAttributeNS(null, "cx", x2);
	    c2.setAttributeNS(null, "cy", y2);
	    c2.setAttributeNS(null, "r",  10);
	    c2.setAttributeNS(null, "fill", color);
			c2.setAttributeNS(null, "stroke", color);
			c2.setAttributeNS(null, "stroke-width", "6");
	    g.appendChild(c2);

			svg.appendChild(g);
	}

	onClick() {

	}

	inputClicked(nodeId) {
		// Remove any TEMP
		var elm = document.getElementById(this.state.nodeFrom + "-" + "TEMP");
		if(elm) {
			elm.parentNode.removeChild(elm);
		}

		this.setState({ nodeTo: nodeId });

		// Draw the line...
		if(this.state.outputClicked && this.state.nodeFrom != nodeId) {
			this.setState({ outputClicked: false }, function() {

				var _nodeMap = this.state.nodeMap;

				_nodeMap[this.state.nodeFrom].outports.push(nodeId);
				_nodeMap[nodeId].inports.push(this.state.nodeFrom);

				this.setState({ nodeMap: _nodeMap });

				console.log(_nodeMap[this.state.nodeFrom].outports);
				console.log(_nodeMap[nodeId].inports);

				this.drawNodeConnectorX(this.state.nodeFrom, this.state.nodeTo, this.state.connectorColor, this.state.connectorTension);
			}.bind(this) );
		}
	}

	outputClicked(nodeId) {
		this.setState({ nodeFrom: nodeId, outputClicked: true });
	}

	nodeMove(nodeId) {
		// Remove any TEMP
		var elm = document.getElementById(this.state.nodeFrom + "-" + "TEMP");
		if(elm) {
			elm.parentNode.removeChild(elm);
		}
    var node_outport = document.getElementById( nodeId + "_OUTPORT" );
		var rect = node_outport.getBoundingClientRect();
		// 1. Retrieve all inports of current node component
		// 1.1 Update all lines with new location
		// 2. Retrieve all outports of current node component
		// 2.1 Update all lines with new location

		var _inports = this.state.nodeMap[nodeId].inports;
		var _outports = this.state.nodeMap[nodeId].outports;

		for( var i=0; i < _inports.length; i++ ) {
			var elm = document.getElementById(_inports[i] + "-" + nodeId);
			if(elm) {
				elm.parentNode.removeChild(elm);
				this.drawNodeConnectorX(_inports[i], nodeId, '#0091ef', 0.6);
			}
		}

		for( var j=0; j < _outports.length; j++ ) {
			var elm = document.getElementById(nodeId + "-" + _outports[j]);
			if(elm) {
			  elm.parentNode.removeChild(elm);
				this.drawNodeConnectorX(nodeId, _outports[j], '#0091ef', 0.6);
			}
		}
	}

	onMouseMove(e) {
		if(this.state.outputClicked) {
			var elm = document.getElementById(this.state.nodeFrom + "-" + "TEMP");
			if(elm) {
				elm.parentNode.removeChild(elm);
			}
			this.drawTempNodeConnector(this.state.nodeFrom, e.clientX, e.clientY, this.state.connectorColor, this.state.connectorTension);
		}
	}

	onClickStage(e) {
		// Remove any TEMP
		var elm = document.getElementById(this.state.nodeFrom + "-" + "TEMP");
		if(elm) {
			elm.parentNode.removeChild(elm);
			this.setState({ outputClicked: false});
		}
	}

	onClickComp(id) {
		this.setState({ selectedNode: id });
	}

  onRemove() {
		var elem = document.getElementById( this.state.selectedNode );
		if(elem) {
      var _inports = this.state.nodeMap[this.state.selectedNode].inports;
  		var _outports = this.state.nodeMap[this.state.selectedNode].outports;

      for(var i=0; i < _inports.length; i++) {
        var ip = document.getElementById(_inports[i] + "-" + this.state.selectedNode);
        if(ip) ip.parentNode.removeChild(ip);
      }
      for(var j=0; j < _outports.length; j++) {
        var op = document.getElementById( this.state.selectedNode + "-" + _outports[j]);
        if(op) op.parentNode.removeChild(op);
      }
			elem.parentNode.removeChild(elem);
		}
	}

	onAddNode() {
		var node = {};

		var id = this.state.idx;
			node.id = "NODE" + id;
			node.title = "NODE" + id;
			node.inports = [];
			node.outports = [];

		var _nodeMap = this.state.nodeMap;
			_nodeMap[node.id] = node;
		this.setState({ nodeMap: _nodeMap, idx: id+1 });
	}

  onClearAll() {
    this.setState({ nodeMap: {}, idx: 0 });
  }

  render() {
		const fcb = {fcbInput: this.inputClicked, fcbOutput: this.outputClicked, fcbMove: this.nodeMove, fcbSelect: this.onClickComp };
		var compMap = [];
		for(var tid in this.state.nodeMap) {
			var item = this.state.nodeMap[tid];
      var x = this.props.fcbNode();
      compMap.push(
        <FloNode id={item.id} key={item.id} title={item.title} {...fcb}> {x} </FloNode>
      );
		}
    return <div>
              <div style={{position:'absolute', zIndex: 9999}}>
                <span>[ React Flo ] {' '}</span>
                <button onClick={this.onAddNode.bind(this)}>Add Node</button>{' '}
                <button onClick={this.onRemove.bind(this)}>Remove Node</button>{' '}
                <button onClick={this.onClearAll.bind(this)}>Clear All</button>{' '}
              </div>

							<div style={{position:'absolute'}} onMouseMove={this.onMouseMove.bind(this)} onClick={this.onClickStage.bind(this)}>
								<span class="main">
									{ compMap }
								</span>
                <svg id="svgCanvas" x={0} y={0} width="100vw" height="100vh" style={{position:'absolute'}} >
                </svg>
							</div>
          </div>;
  }
}
