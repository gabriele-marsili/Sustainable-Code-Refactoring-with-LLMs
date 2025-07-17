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
});
