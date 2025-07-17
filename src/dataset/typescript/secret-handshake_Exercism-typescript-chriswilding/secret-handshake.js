"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _HandShake_flags;
Object.defineProperty(exports, "__esModule", { value: true });
const ACTIONS = [
    'wink',
    'double blink',
    'close your eyes',
    'jump',
];
const REVERSE = 16;
class HandShake {
    constructor(flags) {
        _HandShake_flags.set(this, void 0);
        __classPrivateFieldSet(this, _HandShake_flags, flags, "f");
    }
    commands() {
        const actions = ACTIONS.filter((_, index) => __classPrivateFieldGet(this, _HandShake_flags, "f") & Math.pow(2, index));
        if (__classPrivateFieldGet(this, _HandShake_flags, "f") & REVERSE) {
            actions.reverse();
        }
        return actions;
    }
}
_HandShake_flags = new WeakMap();
exports.default = HandShake;
