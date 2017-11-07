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
  console.log(arr);
  return arr;
}

export function calculateFromArr(arr=[]) {

}