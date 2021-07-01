import * as React from 'react';
import getRef, { RefType } from '../utils/getRef';

type EventType = MouseEvent | TouchEvent;

function useClickAway<E extends Event = EventType>(ref: RefType | RefType[], onClickAway: (event: E) => void, events: string | string[] = 'click') {
  const onClickAwayRef = React.useRef(onClickAway);
  onClickAwayRef.current = onClickAway;

  React.useEffect(() => {
    const handler = (event: any) => {
      const targets = Array.isArray(ref) ? ref : [ref];
      if (
        !targets.some(targetItem => {
          const target = getRef(targetItem);
          return !target || target?.contains(event.target);
        })
      ) {
        onClickAwayRef.current?.(event);
      }
    }

    const eventList = Array.isArray(events) ? events : [events];

    for (const eventName of eventList) {
      document.addEventListener(eventName, handler);
    }

    return () => {
      for (const eventName of eventList) {
        document.removeEventListener(eventName, handler);
      }
    }
  }, [ref, events]);
}

export default useClickAway;