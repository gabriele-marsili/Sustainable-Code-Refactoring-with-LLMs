"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInput = createInput;
exports.createComputed = createComputed;
exports.createCallback = createCallback;
let activeObserver;
let callbackObservers = [];
function createInput(value, _equal, options) {
    const subject = {
        name: options === null || options === void 0 ? void 0 : options.name,
        value,
        equalFn: typeof _equal === "function" ? _equal : _equal ? (a, b) => a === b : undefined,
    };
    const read = () => subject.value;
    const write = (newValue) => {
        if (subject.equalFn ? !subject.equalFn(subject.value, newValue) : subject.value !== newValue) {
            subject.value = newValue;
            callbackObservers.forEach((observer) => observer.updateFn());
        }
    };
    return [read, write];
}
function createComputed(updateFn, value, _equal, options) {
    activeObserver = { name: options === null || options === void 0 ? void 0 : options.name, value, updateFn };
    return () => updateFn(value);
}
function createCallback(updateFn, value) {
    const observer = { name: Math.random().toString(36).slice(2), value, updateFn };
    callbackObservers.push(observer);
    return () => {
        callbackObservers = callbackObservers.filter((o) => o !== observer);
    };
}
