"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const secret_handshake_1 = __importDefault(require("./secret-handshake"));
describe('Create a handshake for a number', () => {
    it('wink for 1', () => {
        const handshake = new secret_handshake_1.default(1);
        const expected = ['wink'];
        expect(handshake.commands()).toEqual(expected);
    });
    it('double blink for 10', () => {
        const handshake = new secret_handshake_1.default(2);
        const expected = ['double blink'];
        expect(handshake.commands()).toEqual(expected);
    });
    it('close your eyes for 100', () => {
        const handshake = new secret_handshake_1.default(4);
        const expected = ['close your eyes'];
        expect(handshake.commands()).toEqual(expected);
    });
    it('jump for 1000', () => {
        const handshake = new secret_handshake_1.default(8);
        const expected = ['jump'];
        expect(handshake.commands()).toEqual(expected);
    });
    it('combine two actions', () => {
        const handshake = new secret_handshake_1.default(3);
        const expected = ['wink', 'double blink'];
        expect(handshake.commands()).toEqual(expected);
    });
    it('reverse two actions', () => {
        const handshake = new secret_handshake_1.default(19);
        const expected = ['double blink', 'wink'];
        expect(handshake.commands()).toEqual(expected);
    });
    it('reversing one action gives the same action', () => {
        const handshake = new secret_handshake_1.default(24);
        const expected = ['jump'];
        expect(handshake.commands()).toEqual(expected);
    });
    it('reversing no actions still gives no actions', () => {
        const handshake = new secret_handshake_1.default(16);
        const expected = [];
        expect(handshake.commands()).toEqual(expected);
    });
    it('all possible actions', () => {
        const handshake = new secret_handshake_1.default(15);
        const expected = ['wink', 'double blink', 'close your eyes', 'jump'];
        expect(handshake.commands()).toEqual(expected);
    });
    it('reverse all possible actions', () => {
        const handshake = new secret_handshake_1.default(31);
        const expected = ['jump', 'close your eyes', 'double blink', 'wink'];
        expect(handshake.commands()).toEqual(expected);
    });
    it('do nothing for zero', () => {
        const handshake = new secret_handshake_1.default(0);
        const expected = [];
        expect(handshake.commands()).toEqual(expected);
    });
});
