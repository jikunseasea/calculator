import Big from 'big.js';

export function isNumber(item) {
  // return !!item.match(/[0-9]+/);
  if (typeof item === 'number' && !isNaN(item)) return true;
  if (item && item.match) return !!item.match(/[0-9]+/);
  return false;
}
export function canInputDot(stack) {
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

const lastIsNum = v => {
  if (!v) return false;
  const last = v[v.length - 1];
  return isNumber(last);
};

export function arrFromStack(stack=[]) {
  const arr = stack.reduce((a, c) => {
    if (lastIsNum(a)) {
      switch (c) {
        case '*':
        case '-':
        case '+':
        case '/':
          return [...a, c];
        case '%':
          return [...a.slice(0, a.length - 1), `${a[a.length - 1] / 100}`];
        default:
          return [...a.slice(0, a.length - 1), `${a[a.length - 1]}${c}`];
      }
    } else {
      const last = a[a.length - 1];
      if (last && last.endsWith && last.endsWith('.') && isNumber(c)) {
        return [...a.slice(0, a.length - 1), `${a[a.length - 1]}${c}`];
      }
      switch (c) {
        case '.':
          return [...a, '0.'];
        default:
          return [...a, c];
      }
    }
  }, []);
  // console.log(arr);
  return arr;
}

// const calculateHelper = (arr, oper, callback) => {
//   const index = arr.lastIndexOf(oper);
//   if (index > -1) { 
//     return callback(calculateFromArr(arr.slice(0, arr.length - 1), parseFloat(arr[index + 1])))
//   }
//   return null;
// };

function calculateBigFromArr(arr=[]) {
  // let temp = null;
  // temp = calculateHelper(arr, '+', (a, b) => a + b);
  // if (!temp)
  //   temp = calculateHelper(arr, '-', (a, b) => a - b);
  // if (!temp)
  //   temp = calculateHelper(arr, '*', (a, b) => a * b);
  // if (!temp)
  //   temp = calculateHelper(arr, '/', (a, b) => a / b);
  // return temp === null ? temp : parseFloat(arr[0]);

  let index = -1;
  index = arr.lastIndexOf('+');
  if (index > -1) {
    return calculateBigFromArr(arr.slice(0, index)).plus(calculateBigFromArr(arr.slice(index + 1)));
  }
  index = arr.lastIndexOf('-');
  if (index > -1) {
    return calculateBigFromArr(arr.slice(0, index)).minus(calculateBigFromArr(arr.slice(index + 1)));
  }
  index = arr.lastIndexOf('*');
  if (index > -1) {
    return calculateBigFromArr(arr.slice(0, index)).times(calculateBigFromArr(arr.slice(index + 1)));
  }
  index = arr.lastIndexOf('/');
  if (index > -1) {
    return calculateBigFromArr(arr.slice(0, index)).div(calculateBigFromArr(arr.slice(index + 1)));
  }
  return new Big(parseFloat(arr[0]));
}

export const calculateFromArr = (arr=[]) => calculateBigFromArr(arr).toFixed();