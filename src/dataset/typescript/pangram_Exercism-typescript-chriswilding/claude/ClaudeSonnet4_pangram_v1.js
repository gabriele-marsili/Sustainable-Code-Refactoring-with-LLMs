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
var _Pangram_input;
Object.defineProperty(exports, "__esModule", { value: true });
const isLowerCaseASCIILetter = (input) => {
    const c = input.charCodeAt(0);
    return c >= 97 && c < 123;
};
class Pangram {
    constructor(input) {
        _Pangram_input.set(this, void 0);
        __classPrivateFieldSet(this, _Pangram_input, input, "f");
    }
    isPangram() {
        let letterMask = 0;
        for (let i = 0; i < __classPrivateFieldGet(this, _Pangram_input, "f").length; i++) {
            const charCode = __classPrivateFieldGet(this, _Pangram_input, "f").charCodeAt(i);
            let letterIndex = -1;
            if (charCode >= 65 && charCode <= 90) {
                letterIndex = charCode - 65;
            }
            else if (charCode >= 97 && charCode <= 122) {
                letterIndex = charCode - 97;
            }
            if (letterIndex !== -1) {
                letterMask |= (1 << letterIndex);
                if (letterMask === 0x3FFFFFF) {
                    return true;
                }
            }
        }
        return letterMask === 0x3FFFFFF;
    }
}
_Pangram_input = new WeakMap();
exports.default = Pangram;
