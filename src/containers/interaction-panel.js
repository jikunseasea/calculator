import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions';

import './interaction-panel.css';

class InteractionPanel extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  isNumber(item) {
    return !!item.match(/[0-9]+/);
  }

  handleClick(e) {
    const { name } = e.target;

    let input = null;

    switch (name) {
      case 'AC':
      case 'DEL':
      case '/':
      case '*':
      case '+':
      case '-':
      case '.':
      case '=':
      case '%':
      default:
        input = parseInt(name);
    }

    const { pushTempStack } = this.props;
    pushTempStack(input);
  }

  render() {
    return (
      <div className="interaction-panel fluid-container">
        <div className="row panel-row">
          <button className="col-xs-3 span-row btn-clear" onClick={this.handleClick} name="AC">AC</button>
          <button className="col-xs-3 span-row" onClick={this.handleClick} name="DEL">DEL</button>
          <button className="col-xs-3 span-row" onClick={this.handleClick} name="/">/</button>
          <button className="col-xs-3 span-row" onClick={this.handleClick} name="*">*</button>
        </div>
        <div className="row panel-row">
          <button className="col-xs-3 span-row" onClick={this.handleClick} name="7">7</button>
          <button className="col-xs-3 span-row" onClick={this.handleClick} name="8">8</button>
          <button className="col-xs-3 span-row" onClick={this.handleClick} name="9">9</button>
          <button className="col-xs-3 span-row" onClick={this.handleClick} name="-">-</button>
        </div>
        <div className="row panel-row">
          <button className="col-xs-3 span-row" onClick={this.handleClick} name="4">4</button>
          <button className="col-xs-3 span-row" onClick={this.handleClick} name="5">5</button>
          <button className="col-xs-3 span-row" onClick={this.handleClick} name="6">6</button>
          <button className="col-xs-3 span-row" onClick={this.handleClick} name="+">+</button>
        </div>
        <div className="row panel-row">
          <div className="col-xs-9 span-row">
            <div className="row divi-row">
              <button className="col-xs-4 span-row" onClick={this.handleClick} name="1">1</button>
              <button className="col-xs-4 span-row" onClick={this.handleClick} name="2">2</button>
              <button className="col-xs-4 span-row" onClick={this.handleClick} name="3">3</button>
            </div>
            <div className="row divi-row">
              <button className="col-xs-4 span-row" onClick={this.handleClick} name="%">%</button>
              <button className="col-xs-4 span-row" onClick={this.handleClick} name="0">0</button>
              <button className="col-xs-4 span-row" onClick={this.handleClick} name=".">.</button>
            </div>
          </div>
          <div className="col-xs-3 span-row">
            <button className="col-xs-12 span-row btn-equal">=</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { tempStack, tempResult, result } = state;
  return { tempStack, tempResult, result };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, actions)(InteractionPanel);
// export default InteractionPanel;