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
    // return !!item.match(/[0-9]+/);
    if (typeof item === 'number' && !isNaN(item)) return true;
    if (item && item.match) return !!item.match(/[0-9]+/);
    return false;
  }

  canInputDot(stack) {
    const { length } = stack;
    if (!length) return true;
    const isPlus = v => v === '+';
    const isMinus = v => v === '-';
    const isMultiply = v => v === '*';
    const isDivide = v => v === '/';
    const isPercent = v => v === '%';
    const isDot = v => v === '.';
    for (let i = length - 1; i > -1; --i) {
      const v = stack[i];
      if (isPercent(v) || isDot(v)) {
        return false;
      } else if (isPlus(v) || isMinus(v) || isMultiply(v) || isDivide(v)) {
        break;
      }
    }
    return true;
  }

  handleClick(e) {
    const { name } = e.target;
    const { stack, pushStack, computeResult, updateCurrent, clearStack, delStack } = this.props;
    const { length } = stack;

    switch (name) {
      case 'AC':
        clearStack();
        break;
      case 'DEL':
        delStack();
        break;
      case '/':
      case '*':
      case '+':
      case '-':
        if (this.isNumber(stack[length - 1])) {
          pushStack(name);
        } else if (stack[length - 1] !== '.' && stack[length - 1]) {
          delStack(); // If the last of STACK is operator, override it.
          pushStack(name);
        }
        break;
      case '.':
        if (this.canInputDot(stack)) {
          pushStack(name);
        }
        break;
      case '=':
        computeResult();
        break;
      case '%':
        // updateCurrent(name);
        if (this.isNumber(stack[length - 1])) {
          pushStack(name);
          computeResult();
        }
        break;
      default: // Number
        const inputNum = parseInt(name);
        if (stack[length - 1] !== '%') {
          pushStack(inputNum);
          computeResult();
        }
        // if (this.isNumber(stack[length - 1]) || (stack[length - 1] === '.')) {
        //   // updateCurrent(inputNum);
        //   pushStack(inputNum);
        //   computeResult();
        // } else if (this.isNumber() !== '%') {
        //   pushStack(inputNum);
        //   computeResult();
        // }
    }

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
            <button className="col-xs-12 span-row btn-equal" onClick={this.handleClick} name="=">=</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { stack } = state;
  return { stack };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, actions)(InteractionPanel);
// export default InteractionPanel;