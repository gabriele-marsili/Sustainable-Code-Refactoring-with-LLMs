"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const linked_list_1 = __importDefault(require("./linked-list"));
describe('LinkedList', () => {
    it('add/extract elements to the end of the list with push/pop', () => {
        const list = new linked_list_1.default();
        list.push(10);
        list.push(20);
        expect(list.pop()).toBe(20);
        expect(list.pop()).toBe(10);
    });
    it('extract elements from the beginning of the list with shift', () => {
        const list = new linked_list_1.default();
        list.push(10);
        list.push(20);
        expect(list.shift()).toBe(10);
        expect(list.shift()).toBe(20);
    });
    it('add/extract elements from the beginning of the list with unshift/shift', () => {
        const list = new linked_list_1.default();
        list.unshift(10);
        list.unshift(20);
        expect(list.shift()).toBe(20);
        expect(list.shift()).toBe(10);
    });
    it('unshift/pop', () => {
        const list = new linked_list_1.default();
        list.unshift(10);
        list.unshift(20);
        expect(list.pop()).toBe(10);
        expect(list.pop()).toBe(20);
    });
    it('example', () => {
        const list = new linked_list_1.default();
        list.push(10);
        list.push(20);
        expect(list.pop()).toBe(20);
        list.push(30);
        expect(list.shift()).toBe(10);
        list.unshift(40);
        list.push(50);
        expect(list.shift()).toBe(40);
        expect(list.pop()).toBe(50);
        expect(list.shift()).toBe(30);
    });
    it('can count its elements', () => {
        const list = new linked_list_1.default();
        expect(list.count()).toBe(0);
        list.push(10);
        expect(list.count()).toBe(1);
        list.push(20);
        expect(list.count()).toBe(2);
    });
    it('sets head/tail after popping last element', () => {
        const list = new linked_list_1.default();
        list.push(10);
        list.pop();
        list.unshift(20);
        expect(list.count()).toBe(1);
        expect(list.pop()).toBe(20);
    });
    it('sets head/tail after shifting last element', () => {
        const list = new linked_list_1.default();
        list.unshift(10);
        list.shift();
        list.push(20);
        expect(list.count()).toBe(1);
        expect(list.shift()).toBe(20);
    });
    it('deletes the element with the specified value from the list', () => {
        const list = new linked_list_1.default();
        list.push(10);
        list.push(20);
        list.push(30);
        list.delete(20);
        expect(list.count()).toBe(2);
        expect(list.pop()).toBe(30);
        expect(list.shift()).toBe(10);
    });
    it('deletes the only element', () => {
        const list = new linked_list_1.default();
        list.push(10);
        list.delete(10);
        expect(list.count()).toBe(0);
    });
    it('delete does not modify the list if the element is not found', () => {
        const list = new linked_list_1.default();
        list.push(10);
        list.delete(20);
        expect(list.count()).toBe(1);
    });
});
