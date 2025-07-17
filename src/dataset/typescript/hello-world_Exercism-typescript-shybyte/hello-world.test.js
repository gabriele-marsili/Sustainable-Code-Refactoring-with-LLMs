"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hello_world_1 = __importDefault(require("./hello-world"));
describe('Hello World', () => {
    it('says hello world with no name', () => {
        expect(hello_world_1.default.hello()).toEqual('Hello, World!');
    });
    it('says hello to bob', () => {
        expect(hello_world_1.default.hello('Bob')).toEqual('Hello, Bob!');
    });
    it('says hello to sally', () => {
        expect(hello_world_1.default.hello('Sally')).toEqual('Hello, Sally!');
    });
});
