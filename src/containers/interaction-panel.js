import React from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { isNumber, canInputDot, arrFromStack } from '../logic/util';

import * as actions from '../actions';

import './interaction-panel.css';

class InteractionPanel extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const { name } = e.target;
    const { stack, pushStack, computeResult, clearStack, delStack } = this.props;
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
        if (isNumber(stack[length - 1]) || stack[length - 1] === '%') {
          pushStack(name);
        } else if (stack[length - 1] !== '.' && stack[length - 1]) {
          delStack(); // If the last of STACK is operator, override it.
          pushStack(name);
        }
        break;
      case '.':
        if (canInputDot(stack)) {
          pushStack(name);
        }
        break;
      case '=':
        computeResult(arrFromStack(stack));
        break;
      case '%':
        if (isNumber(stack[length - 1])) {
          pushStack(name);
          computeResult(arrFromStack(stack));
        }
        break;
      default: // Number
        if (stack[length - 1] !== '%') {
          pushStack(name);
          computeResult(arrFromStack(stack));
        }
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
// const mapDispatchToProps = (dispatch) => {
//   console.log(actions);
//   console.log(bindActionCreators(actions, dispatch));
//   return bindActionCreators(actions, dispatch);
// };

export default connect(mapStateToProps, actions)(InteractionPanel);
// export default connect(mapStateToProps, mapDispatchToProps)(InteractionPanel);