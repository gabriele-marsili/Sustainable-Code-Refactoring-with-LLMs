type EqualFn<T> = (lhs: T, rhs: T) => boolean;
type GetterFn<T> = () => T;
type SetterFn<T> = (value: T) => void;
type UnsubscribeFn = () => void;
type UpdateFn<T> = (value?: T) => T;

type InputPair<T> = [GetterFn<T>, SetterFn<T>];

type Options = {
  name: string;
};

type Observer<T> = {
  name?: string;
  value?: T;
  updateFn: UpdateFn<T>;
};

type Subject<T> = {
  name?: string;
  observer?: Observer<any>;
  value: T;
  equalFn?: EqualFn<T>;
};

let activeObserver: Observer<any> | undefined;
let callbackObservers = new Set<Observer<any>>();

function createInput<T>(
  value: T,
  _equal?: boolean | EqualFn<T>,
  options?: { name?: string }
): InputPair<T> {
  const s: Subject<T> = {
    name: options?.name,
    value,
    equalFn: typeof _equal === "function" ? _equal : _equal ? (a, b) => a === b : undefined,
  };

  const read: GetterFn<T> = () => s.value;

  const write: SetterFn<T> = (newValue) => {
    if (s.equalFn ? s.equalFn(s.value, newValue) : s.value === newValue) return;

    s.value = newValue;

    callbackObservers.forEach((observer) => {
      observer.updateFn();
    });
  };

  return [read, write];
}

function createComputed<T>(
  updateFn: UpdateFn<T>,
  value?: T,
  _equal?: boolean | EqualFn<T>,
  options?: { name?: string }
): GetterFn<T> {
  const observer: Observer<T> = {
    name: options?.name,
    value,
    updateFn,
  };

  activeObserver = observer;

  const compute = (): T => {
    const newValue = updateFn(observer.value);
    if (observer.value !== newValue) observer.value = newValue;
    return observer.value!;
  };

  return compute;
}

function createCallback<T>(_updateFn: UpdateFn<T>, _value?: T): UnsubscribeFn {
  const callback: Observer<T> = {
    name: Math.random().toString(36).substring(2),
    value: _value,
    updateFn: _updateFn,
  };

  callbackObservers.add(callback);

  return () => {
    callbackObservers.delete(callback);
  };
}

export { createInput, createComputed, createCallback };