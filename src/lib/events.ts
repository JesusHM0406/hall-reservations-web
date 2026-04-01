type EventType = 'auth:login-success' | 'auth:unauthorized' | 'auth:logout';

export const eventBus = {
  on(event: EventType, callback: EventListener) {
    document.addEventListener(event, callback);
  },
  
  dispatch(event: EventType) {
    document.dispatchEvent(new Event(event));
  },

  remove(event: EventType, callback: EventListener) {
    document.removeEventListener(event, callback);
  }
};