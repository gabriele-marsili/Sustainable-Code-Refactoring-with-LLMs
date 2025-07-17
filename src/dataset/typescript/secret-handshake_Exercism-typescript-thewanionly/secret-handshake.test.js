"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const secret_handshake_1 = require("./secret-handshake");
describe('Secret Handshake', () => {
    describe('Create A Handshake For A Number', () => {
        it('wink for 1', () => {
            expect((0, secret_handshake_1.commands)(1)).toEqual(['wink']);
        });
        it('double blink for 10', () => {
            expect((0, secret_handshake_1.commands)(2)).toEqual(['double blink']);
        });
        it('close your eyes for 100', () => {
            expect((0, secret_handshake_1.commands)(4)).toEqual(['close your eyes']);
        });
        it('jump for 1000', () => {
            expect((0, secret_handshake_1.commands)(8)).toEqual(['jump']);
        });
        it('combine two actions', () => {
            expect((0, secret_handshake_1.commands)(3)).toEqual(['wink', 'double blink']);
        });
        it('reverse two actions', () => {
            expect((0, secret_handshake_1.commands)(19)).toEqual(['double blink', 'wink']);
        });
        it('reversing one action gives the same action', () => {
            expect((0, secret_handshake_1.commands)(24)).toEqual(['jump']);
        });
        it('reversing no actions still gives no actions', () => {
            expect((0, secret_handshake_1.commands)(16)).toEqual([]);
        });
        it('all possible actions', () => {
            expect((0, secret_handshake_1.commands)(15)).toEqual(['wink', 'double blink', 'close your eyes', 'jump']);
        });
        it('reverse all possible actions', () => {
            expect((0, secret_handshake_1.commands)(31)).toEqual(['jump', 'close your eyes', 'double blink', 'wink']);
        });
        it('do nothing for zero', () => {
            expect((0, secret_handshake_1.commands)(0)).toEqual([]);
        });
    });
});
