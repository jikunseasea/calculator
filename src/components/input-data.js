import React from 'react';

import './input-data.css';

import { arrFromStack } from '../logic/util';


class InputData extends React.Component {

  render() {
    const { stack } = this.props;
    // const isNum = v => typeof parseInt(v) === 'number' && !isNaN(parseInt(v));
    // const lastIsNum = v => {
    //   if (!v) return false;
    //   const last = v[v.length - 1];
    //   console.log('last is ' + last);
    //   return isNumber(last);
    // };
    // const stackView = stack.reduce((a, c) => {
    //   if (lastIsNum(a)) {
    //     // console.log(a + ' is num');
    //     switch (c) {
    //       case '*':
    //       case '-':
    //       case '+':
    //       case '/':
    //         return a + ' ' + c;
    //       default:
    //         return a + c;
    //     }
    //   } else {
    //     // console.log(a + ' is not num');
    //     if (a[a.length - 1] === '.' && isNumber(c)) return a + c;
    //     switch (c) {
    //       case '.':
    //         return a + ' 0.';
    //       default:
    //         return a + ' ' + c;
    //     }
    //   }
    // }, '');
    const stackView = arrFromStack(stack).join(' ');
    return (
      <div className="input-data">{ stackView }</div>
    );
  }
}

export default InputData