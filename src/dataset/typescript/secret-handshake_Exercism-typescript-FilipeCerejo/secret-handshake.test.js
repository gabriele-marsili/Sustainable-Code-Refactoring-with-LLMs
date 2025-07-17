"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const secret_handshake_1 = require("./secret-handshake");
describe('Secret Handshake', () => {
    describe('Create A Handshake For A Number', () => {
        it('wink for 1', () => {
            expect((0, secret_handshake_1.commands)(1)).toEqual(['wink']);
        });
        xit('double blink for 10', () => {
            expect((0, secret_handshake_1.commands)(2)).toEqual(['double blink']);
        });
        xit('close your eyes for 100', () => {
            expect((0, secret_handshake_1.commands)(4)).toEqual(['close your eyes']);
        });
        xit('jump for 1000', () => {
            expect((0, secret_handshake_1.commands)(8)).toEqual(['jump']);
        });
        xit('combine two actions', () => {
            expect((0, secret_handshake_1.commands)(3)).toEqual(['wink', 'double blink']);
        });
        xit('reverse two actions', () => {
            expect((0, secret_handshake_1.commands)(19)).toEqual(['double blink', 'wink']);
        });
        xit('reversing one action gives the same action', () => {
            expect((0, secret_handshake_1.commands)(24)).toEqual(['jump']);
        });
        xit('reversing no actions still gives no actions', () => {
            expect((0, secret_handshake_1.commands)(16)).toEqual([]);
        });
        xit('all possible actions', () => {
            expect((0, secret_handshake_1.commands)(15)).toEqual([
                'wink',
                'double blink',
                'close your eyes',
                'jump',
            ]);
        });
        xit('reverse all possible actions', () => {
            expect((0, secret_handshake_1.commands)(31)).toEqual([
                'jump',
                'close your eyes',
                'double blink',
                'wink',
            ]);
        });
        xit('do nothing for zero', () => {
            expect((0, secret_handshake_1.commands)(0)).toEqual([]);
        });
    });
});
