import { MutableRefObject, RefObject } from 'react';

export type RefType<T = HTMLElement> =
  | RefObject<T>
  | null
  | (() => T | null)
  | T
  | MutableRefObject<T>;

function getRef(ref: RefType) {
  if (typeof ref === 'function') {
    return ref();
  } else if (ref && 'current' in ref) {
    return ref.current;
  } else {
    return ref;
  }
}

export default getRef;
