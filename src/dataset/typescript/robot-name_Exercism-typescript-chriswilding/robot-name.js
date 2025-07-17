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
var _Robot_name;
Object.defineProperty(exports, "__esModule", { value: true });
function shuffle(names) {
    for (let i = names.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [names[i], names[j]] = [names[j], names[i]];
    }
}
function generateNames() {
    const names = [];
    for (let i = 65; i < 91; i++) {
        for (let j = 65; j < 91; j++) {
            for (let k = 0; k < 1000; k++) {
                names.push(`${String.fromCharCode(i)}${String.fromCharCode(j)}${k.toString().padStart(3, '0')}`);
            }
        }
    }
    return names;
}
class Robot {
    constructor() {
        _Robot_name.set(this, void 0);
        __classPrivateFieldSet(this, _Robot_name, Robot.names.pop(), "f");
    }
    get name() {
        return __classPrivateFieldGet(this, _Robot_name, "f");
    }
    resetName() {
        __classPrivateFieldSet(this, _Robot_name, Robot.names.pop(), "f");
    }
    static releaseNames() {
        Robot.names = generateNames();
        shuffle(Robot.names);
    }
}
_Robot_name = new WeakMap();
exports.default = Robot;
Robot.releaseNames();
