import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

import Draggable, {DraggableCore} from 'react-draggable';

import styles from "../assets/css/style.css";

export default class FloNode extends React.Component {
  constructor(props) {
    super(props);

		var posx, posy;
			posx = (Math.floor(Math.random() * 5) + 1) * 25 + 50;
			posy = (Math.floor(Math.random() * 5) + 1) * 25 + 50;

    if(this.props.rect) {
      var r = this.props.rect;
      posx = r.x;
      posy = r.y;
    }

    this.state = {
			id: this.props.id,

			defaultPosition: {
        x: posx, y: posy
      },
			controlledPosition: {
        x: posx, y: posy
      },
			deltaPosition: {
        x: 0, y: 0
      },
    }
		this.onControlledDrag = this.onControlledDrag.bind(this);
		this.onControlledDragStop = this.onControlledDragStop.bind(this);
  }

  componentDidMount() {

  }

	onControlledDrag(e, position) {
    const {x, y} = position;
    this.setState({controlledPosition: {x, y}});
		if(this.props.fcbMove) {
			this.props.fcbMove(this.state.id);
		}
  }

	onControlledDragStop(e, position) {
    this.onControlledDrag(e, position);
    this.onStop();
  }

	onInputClick(e) {
		if(this.props.fcbInput) {
			this.props.fcbInput(this.state.id);
		}
	}

	onOutputClick(e) {
		if(this.props.fcbOutput) {
			this.props.fcbOutput(this.state.id);
		}
	}

	onClick(e) {
		if(this.props.fcbSelect) {
			this.props.fcbSelect(this.state.id);
		}
	}

  render() {
		var posx, posy;
			posx = 0;
			posy = 0;

		const {deltaPosition, defaultPosition, controlledPosition} = this.state;
		const dragHandlers = {onStart: this.onStart, onStop: this.onStop};

    return <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={defaultPosition}
        position={controlledPosition}
				{...dragHandlers}
				onDrag={this.onControlledDrag.bind(this)}
        grid={[5, 5]}
				>
        <div id={this.state.id} className="handle" onClick={this.onClick.bind(this)}>
					<div class="divTable">
						<div class="divTableCell">
							<div onClick={this.onInputClick.bind(this)}>
								<div><Glyphicon id={this.state.id + "_INPORT"} glyph={"log-in"}>{' '}</Glyphicon></div>
							</div>
						</div>
						<div class="divTableCellMain">
							<div>{this.state.id}</div>
              {this.props.children}
						</div>
						<div class="divTableCell">
							<div onClick={this.onOutputClick.bind(this)}>
								<div><Glyphicon id={this.state.id + "_OUTPORT"} glyph={"log-out"}>{' '}</Glyphicon></div>
							</div>
						</div>
					</div>
				</div>
      </Draggable>;
  }
}
