"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInput = createInput;
exports.createComputed = createComputed;
exports.createCallback = createCallback;
let activeObserver = undefined;
let callbackObservers = new Set();
function createInput(value, equal, options) {
    const s = {
        name: options === null || options === void 0 ? void 0 : options.name,
        value,
        equalFn: typeof equal === "function" ? equal : equal ? (a, b) => a === b : undefined,
    };
    const read = () => s.value;
    const write = (newValue) => {
        if (s.equalFn ? s.equalFn(s.value, newValue) : s.value === newValue)
            return;
        s.value = newValue;
        callbackObservers.forEach((observer) => observer.updateFn());
    };
    return [read, write];
}
function createComputed(updateFn, value, equal, options) {
    const observer = {
        name: options === null || options === void 0 ? void 0 : options.name,
        value,
        updateFn,
    };
    activeObserver = observer;
    const compute = () => {
        const newValue = updateFn(observer.value);
        if (!(typeof equal === "function"
            ? equal(observer.value, newValue)
            : equal
                ? observer.value === newValue
                : false)) {
            observer.value = newValue;
        }
        return observer.value;
    };
    activeObserver = undefined;
    return compute;
}
function createCallback(updateFn, value) {
    const observer = {
        name: Math.random().toString(36).substring(2),
        value,
        updateFn,
    };
    callbackObservers.add(observer);
    return () => {
        callbackObservers.delete(observer);
    };
}
