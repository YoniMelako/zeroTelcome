import React, { Component } from "react";
import AddBtn from "../addBtn/AddBtn";
import "./lineCard.css";

class LineCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      line: this.props.line
    };
  }

  render() {
    return (
      <div className="col-sm-4">
        <div className="card" style={{ width: "16rem" }}>
          <img
            src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/xs/iphone-xs-max-gold-select-2018?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1550795409154"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{this.state.line.name}</h5>

            <p className="card-text">
              Call Minutes : {this.state.line.call_minutes}
            </p>
            <p className="card-text">
              Internet Giga : {this.state.line.internet_giga}
            </p>
            <p className="card-text">
              Overseas Calls : {this.state.line.overseas_calls}
            </p>
            <h3>{this.state.line.price}</h3>
            <AddBtn line={this.state.line} />
          </div>
        </div>
      </div>
    );
  }
}

export default LineCard;
