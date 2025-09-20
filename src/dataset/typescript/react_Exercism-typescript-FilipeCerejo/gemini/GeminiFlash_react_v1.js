"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInput = createInput;
exports.createComputed = createComputed;
exports.createCallback = createCallback;
// module Context value
let activeObserver = undefined;
let callbackObservers = [];
/**
 * Creates an input closure. The value is accessed
 * via the accessor and changed via the
 * mutator returned as part an `InputPair<T>`.
 *
 * @typeParam T   - Type of the closure's value.
 *                By extension the type of the return
 *                value of the accessor and the type
 *                of the mutator's single argument.
 *
 * @param value   - Input closure's initial value.
 * @param equal   - By default the current and previous
 *                values are not compared so invoking
 *                the mutator with identical values
 *                will trigger updates on any
 *                subscribers. When `true` is
 *                specified the
 *                {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality | strict equality operator}
 *                is used to compare values and
 *                mutations with unchanging values
 *                **are** suppressed.
 *                When `T` is a structural type
 *                it is necessary to provide a
 *                `(a: T, b: T) => boolean` comparison
 *                predicate instead.
 * @param options - Holder object for relevant options.
 *                Assigning a `name` to a subject can
 *                be useful during debugging.
 * @returns       - An `InputPair<T>`. The 1st
 *                element is the accessor (getter
 *                function), the 2nd element is
 *                the mutator (setter function).
 */
function createInput(value, equal, options) {
    const s = {
        name: options === null || options === void 0 ? void 0 : options.name,
        observer: undefined,
        value,
        equalFn: typeof equal === 'boolean' ? (equal ? (a, b) => a === b : undefined) : equal,
    };
    const read = () => s.value;
    const write = (newValue) => {
        if (s.equalFn && s.equalFn(s.value, newValue)) {
            return; // Value hasn't changed, don't trigger updates
        }
        const oldValue = s.value;
        s.value = newValue;
        if (activeObserver) {
            const before = activeObserver.updateFn();
            const after = activeObserver.updateFn();
            if (before !== after) {
                callbackObservers.forEach((co) => co.updateFn());
            }
        }
    };
    return [read, write];
}
/**
 * Creates a computed (derived) closure with the
 * supplied function which computes the current value
 * of the closure.
 *
 * @privateRemarks
 * `Observer<T>` may be good enough to get through
 * the enabled test case but more is needed to
 * get further ...
 *
 * @typeParam T   - Type of the closure's value.
 *                By extension the type of the value
 *                returned by the update function and
 *                of the value
 *                accepted by the function.
 *
 * @param updateFn - Update function. This function
 *                 references one or more accessors of
 *                 other subjects. It **should not**
 *                 perform side effects. It is expected
 *                 to return a value which will be the
 *                 value of the closure until the next
 *                 update. The closure's value is
 *                 supplied to this update function
 *                 on the next update.
 * @param value    - Initial value that is passed to
 *                 `updateFn` when it executes for the
 *                 first time.
 * @param equal    - By default the current and previous
 *                 values are not compared so updates
 *                 will be triggered even if the value
 *                 doesn't _change_. When `true` is
 *                 specified the
 *                 {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality | strict equality operator}
 *                 is used to compare values and updates
 *                 with identical values **are**
 *                 suppressed. When `T` is a structural
 *                 type it is necessary to provide a
 *                 `(a: T, b: T) => boolean` comparison
 *                 predicate instead.
 * @param options  - Holder object for relevant options.
 *                 Assigning a `name` to a subject can
 *                 be useful during debugging.
 * @returns        - The accessor to the closure's
 *                 value (getter function). Retrieves
 *                 the closure's current value. Used by
 *                 observers (or more accurately their
 *                 update function) to obtain the
 *                 value (and to subscribe for
 *                 updates).
 */
function createComputed(updateFn, initialValue, equal, options) {
    let currentValue = initialValue;
    const equalityFn = typeof equal === 'boolean' ? (equal ? (a, b) => a === b : undefined) : equal;
    const observer = {
        name: options === null || options === void 0 ? void 0 : options.name,
        value: initialValue,
        updateFn: () => {
            const newValue = updateFn(currentValue);
            if (equalityFn && equalityFn(currentValue, newValue)) {
                return currentValue; // No change, return the current value
            }
            currentValue = newValue;
            return currentValue;
        },
    };
    return () => {
        activeObserver = observer;
        try {
            return observer.updateFn();
        }
        finally {
            activeObserver = undefined;
        }
    };
}
/**
 * Creates a callback closure with the supplied
 * function which is expected to perform side effects.
 *
 * @privateRemarks
 * `observer` isn't mean't to be an empty object literal.
 * Replace it with something more appropriate to its
 * purpose.
 *
 * @typeParam T    - Type of the closure's value.
 *                 By extension the type of the value
 *                 returned by the callback function
 *                 and of the value accepted by the
 *                 function.
 *
 * @param updateFn - Callback function. This function
 *                 references one or more accessors of
 *                 subjects. It may perform side effects.
 *                 It will also be passed the
 *                 value that it returned the last time it was
 *                 invoked.
 * @param initialValue    - Initial value that is passed to
 *                 `updateFn` when it executes for
 *                  the first time.
 * @returns        - The `unsubscribe` function. Once
 *                 invoked the callback closure will
 *                 stop receiving updates from the
 *                 subjects it subscribed to.
 */
function createCallback(updateFn, initialValue) {
    const callback = {
        name: Math.random().toString(36).substring(2, 15), // More efficient random string
        value: initialValue,
        updateFn: updateFn,
    };
    callbackObservers.push(callback);
    return () => {
        const index = callbackObservers.indexOf(callback);
        if (index > -1) {
            callbackObservers.splice(index, 1);
        }
    };
}
