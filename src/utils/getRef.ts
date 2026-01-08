import { RefObject } from 'react';

export type RefType<T = HTMLElement> =
  | RefObject<T | null>
  | null
  | (() => T | null)
  | T
  | RefObject<T | undefined>;

function getRef(ref: RefType) {
  if (typeof ref === 'function') {
    return ref();
  } else if (typeof ref === 'object' && ref && 'current' in ref) {
    return ref.current;
  } else {
    return ref;
  }
}

export default getRef;
