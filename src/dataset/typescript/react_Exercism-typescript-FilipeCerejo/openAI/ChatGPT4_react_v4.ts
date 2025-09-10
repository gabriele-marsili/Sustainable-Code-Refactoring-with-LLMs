type EqualFn<T> = (lhs: T, rhs: T) => boolean;
type GetterFn<T> = () => T;
type SetterFn<T> = (value: T) => void;
type UnsubscribeFn = () => void;
type UpdateFn<T> = (value?: T) => T;

type InputPair<T> = [GetterFn<T>, SetterFn<T>];

type Options = {
  name?: string;
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
let callbackObservers: Observer<any>[] = [];

function createInput<T>(
  value: T,
  _equal?: boolean | EqualFn<T>,
  options?: Options
): InputPair<T> {
  const subject: Subject<T> = {
    name: options?.name,
    value,
    equalFn: typeof _equal === "function" ? _equal : _equal ? (a, b) => a === b : undefined,
  };

  const read: GetterFn<T> = () => subject.value;

  const write: SetterFn<T> = (newValue) => {
    if (subject.equalFn ? !subject.equalFn(subject.value, newValue) : subject.value !== newValue) {
      subject.value = newValue;
      callbackObservers.forEach((observer) => observer.updateFn());
    }
  };

  return [read, write];
}

function createComputed<T>(
  updateFn: UpdateFn<T>,
  value?: T,
  _equal?: boolean | EqualFn<T>,
  options?: Options
): GetterFn<T> {
  activeObserver = { name: options?.name, value, updateFn };
  return () => updateFn(value);
}

function createCallback<T>(updateFn: UpdateFn<T>, value?: T): UnsubscribeFn {
  const observer: Observer<T> = { name: Math.random().toString(36).slice(2), value, updateFn };
  callbackObservers.push(observer);
  return () => {
    callbackObservers = callbackObservers.filter((o) => o !== observer);
  };
}

export { createInput, createComputed, createCallback };