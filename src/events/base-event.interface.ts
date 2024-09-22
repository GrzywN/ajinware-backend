export interface BaseEvent<T extends string, P extends object> {
  eventName: T;
  payload: P;
}
