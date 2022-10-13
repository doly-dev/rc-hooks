import { MutableRefObject, RefObject } from 'react';

export type RefType<T = HTMLElement> =
  | RefObject<T>
  | null
  | (() => T | null)
  | T
  | MutableRefObject<T | undefined>;

function getRef(ref: RefType) {
  if (typeof ref === 'function') {
    // @ts-ignore
    return ref();
  } else if (ref && 'current' in ref) {
    return ref.current;
  } else {
    return ref;
  }
}

export default getRef;
