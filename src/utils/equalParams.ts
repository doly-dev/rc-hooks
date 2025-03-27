import { isArray } from 'ut2';

function equalParams(arg1: any[], arg2: any[]) {
  if (!isArray(arg1) || !isArray(arg2)) {
    return false;
  }
  return arg1.length === arg2.length && arg1.every((item, index) => arg2[index] === item);
}

export default equalParams;
