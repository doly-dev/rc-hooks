// from swr
import { isDocumentVisible } from './dom';

type ListenerFunction = () => void;

const listeners: ListenerFunction[] = [];

function subscribe(listener: ListenerFunction) {
  listeners.push(listener);
  return function unsubscribe() {
    const index = listeners.indexOf(listener);
    listeners.splice(index, 1);
  };
}

let eventsBinded = false;
if (typeof window !== 'undefined' && window.addEventListener && !eventsBinded) {
  const revalidate = () => {
    if (!isDocumentVisible()) return;
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  };
  window.addEventListener('visibilitychange', revalidate, false);
  // only bind the events once
  eventsBinded = true;
}

export default subscribe;
