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
  const refs = castArray(ref);
  const latestRefs = useLatest(refs);
  const refsIsFunc = refs.every(item => typeof item === 'function');
  const wrapperRefs = refsIsFunc ? latestRefs : refs;

  const onClickAwayRef = useLatest(onClickAway);
  const eventsArr = castArray(events);
  const eventsRef = useLatest(eventsArr);
  const eventsStr = eventsArr.join('');

  useEffect(() => {
    const handler = (event: any) => {
      const targets: RefType[] = refsIsFunc ? (wrapperRefs as any).current : wrapperRefs;
      if (!targets.some((targetItem) => {
        const target = getRef(targetItem);
        return !target || target?.contains(event.target);
      })) {
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
  }, [wrapperRefs, refsIsFunc, eventsStr]);
}

export default useClickAway;
