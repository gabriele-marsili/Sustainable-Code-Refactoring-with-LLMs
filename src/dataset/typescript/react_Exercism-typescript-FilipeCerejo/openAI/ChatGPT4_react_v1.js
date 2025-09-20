"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInput = createInput;
exports.createComputed = createComputed;
exports.createCallback = createCallback;
let activeObserver;
let callbackObservers = new Set();
function createInput(value, _equal, options) {
    const s = {
        name: options === null || options === void 0 ? void 0 : options.name,
        value,
        equalFn: typeof _equal === "function" ? _equal : _equal ? (a, b) => a === b : undefined,
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
function createComputed(updateFn, value, _equal, options) {
    const observer = {
        name: options === null || options === void 0 ? void 0 : options.name,
        value,
        updateFn,
    };
    activeObserver = observer;
    return () => observer.updateFn(observer.value);
}
function createCallback(updateFn, value) {
    const observer = {
        name: Math.random().toString(36).substring(2),
        value,
        updateFn,
    };
    callbackObservers.add(observer);
    return () => callbackObservers.delete(observer);
}
