"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const circular_buffer_1 = __importStar(require("./circular-buffer"));
describe('CircularBuffer', () => {
    it('reading an empty buffer throws a BufferEmptyError', () => {
        const buffer = new circular_buffer_1.default(1);
        expect(() => buffer.read()).toThrow(circular_buffer_1.BufferEmptyError);
    });
    it('write and read back one item', () => {
        const buffer = new circular_buffer_1.default(1);
        buffer.write('1');
        expect(buffer.read()).toBe('1');
        expect(() => buffer.read()).toThrow(circular_buffer_1.BufferEmptyError);
    });
    it('write and read back multiple items', () => {
        const buffer = new circular_buffer_1.default(2);
        buffer.write('1');
        buffer.write('2');
        expect(buffer.read()).toBe('1');
        expect(buffer.read()).toBe('2');
        expect(() => buffer.read()).toThrow(circular_buffer_1.BufferEmptyError);
    });
    it('clearing a buffer', () => {
        const buffer = new circular_buffer_1.default(2);
        buffer.write('1');
        buffer.write('2');
        buffer.clear();
        expect(() => buffer.read()).toThrow(circular_buffer_1.BufferEmptyError);
        buffer.write('3');
        buffer.write('4');
        expect(buffer.read()).toBe('3');
        expect(buffer.read()).toBe('4');
    });
    it('alternate write and read', () => {
        const buffer = new circular_buffer_1.default(2);
        buffer.write('1');
        expect(buffer.read()).toBe('1');
        buffer.write('2');
        expect(buffer.read()).toBe('2');
    });
    it('reads back oldest item', () => {
        const buffer = new circular_buffer_1.default(3);
        buffer.write('1');
        buffer.write('2');
        buffer.read();
        buffer.write('3');
        expect(buffer.read()).toBe('2');
        expect(buffer.read()).toBe('3');
    });
    it('writing to a full buffer throws a BufferOverflowError', () => {
        const buffer = new circular_buffer_1.default(2);
        buffer.write('1');
        buffer.write('2');
        expect(() => buffer.write('A')).toThrow(circular_buffer_1.BufferOverflowError);
    });
    it('forced writes over write oldest item in a full buffer', () => {
        const buffer = new circular_buffer_1.default(2);
        buffer.write('1');
        buffer.write('2');
        buffer.forceWrite('A');
        expect(buffer.read()).toBe('2');
        expect(buffer.read()).toBe('A');
        expect(() => buffer.read()).toThrow(circular_buffer_1.BufferEmptyError);
    });
    it('forced writes act like write in a non-full buffer', () => {
        const buffer = new circular_buffer_1.default(2);
        buffer.write('1');
        buffer.forceWrite('2');
        expect(buffer.read()).toBe('1');
        expect(buffer.read()).toBe('2');
        expect(() => buffer.read()).toThrow(circular_buffer_1.BufferEmptyError);
    });
    it('alternate force write and read into full buffer', () => {
        const buffer = new circular_buffer_1.default(5);
        buffer.write('1');
        buffer.write('2');
        buffer.write('3');
        buffer.read();
        buffer.read();
        buffer.write('4');
        buffer.read();
        buffer.write('5');
        buffer.write('6');
        buffer.write('7');
        buffer.write('8');
        buffer.forceWrite('A');
        buffer.forceWrite('B');
        expect(buffer.read()).toBe('6');
        expect(buffer.read()).toBe('7');
        expect(buffer.read()).toBe('8');
        expect(buffer.read()).toBe('A');
        expect(buffer.read()).toBe('B');
        expect(() => buffer.read()).toThrow(circular_buffer_1.BufferEmptyError);
    });
});
