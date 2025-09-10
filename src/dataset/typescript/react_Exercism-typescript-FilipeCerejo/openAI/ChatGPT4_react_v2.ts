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

let activeObserver: Observer<any> | undefined = undefined;
let callbackObservers: Set<Observer<any>> = new Set();

function createInput<T>(
  value: T,
  equal?: boolean | EqualFn<T>,
  options?: Options
): InputPair<T> {
  const s: Subject<T> = {
    name: options?.name,
    value,
    equalFn: typeof equal === "function" ? equal : equal ? (a, b) => a === b : undefined,
  };

  const read: GetterFn<T> = () => s.value;

  const write: SetterFn<T> = (newValue) => {
    if (s.equalFn ? s.equalFn(s.value, newValue) : s.value === newValue) return;

    s.value = newValue;

    callbackObservers.forEach((observer) => observer.updateFn());
  };

  return [read, write];
}

function createComputed<T>(
  updateFn: UpdateFn<T>,
  value?: T,
  equal?: boolean | EqualFn<T>,
  options?: Options
): GetterFn<T> {
  const observer: Observer<T> = {
    name: options?.name,
    value,
    updateFn,
  };

  activeObserver = observer;

  const compute = (): T => {
    const newValue = updateFn(observer.value);
    if (
      !(typeof equal === "function"
        ? equal(observer.value, newValue)
        : equal
        ? observer.value === newValue
        : false)
    ) {
      observer.value = newValue;
    }
    return observer.value!;
  };

  activeObserver = undefined;

  return compute;
}

function createCallback<T>(updateFn: UpdateFn<T>, value?: T): UnsubscribeFn {
  const observer: Observer<T> = {
    name: Math.random().toString(36).substring(2),
    value,
    updateFn,
  };

  callbackObservers.add(observer);

  return () => {
    callbackObservers.delete(observer);
  };
}

export { createInput, createComputed, createCallback };