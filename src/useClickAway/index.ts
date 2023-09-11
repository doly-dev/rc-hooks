import { useEffect } from 'react';
import { castArray } from 'ut2';
import getRef, { RefType } from '../utils/getRef';
import useLatest from '../useLatest';

type EventType = MouseEvent | TouchEvent;

function useClickAway<E extends Event = EventType>(
  ref: RefType | RefType[],
  onClickAway: (event: E) => void,
  events: string | string[] = 'click'
) {
  const latestRef = useLatest(ref);
  const onClickAwayRef = useLatest(onClickAway);
  const eventsRef = useLatest(events);

  useEffect(() => {
    const handler = (event: any) => {
      const targets = Array.isArray(latestRef.current) ? latestRef.current : [latestRef.current];
      if (
        !targets.some((targetItem) => {
          const target = getRef(targetItem);
          return !target || target?.contains(event.target);
        })
      ) {
        onClickAwayRef.current?.(event);
      }
    };

    const eventList = castArray(eventsRef.current);

    eventList.forEach(eventName => {
      document.addEventListener(eventName, handler);
    });

    return () => {
      eventList.forEach(eventName => {
        document.removeEventListener(eventName, handler);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useClickAway;
