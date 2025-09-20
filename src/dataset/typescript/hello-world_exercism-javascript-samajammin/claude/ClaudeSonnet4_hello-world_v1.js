"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hello = (name = 'World') => `Hello, ${name}!`;
class HelloWorld {
}
HelloWorld.hello = hello;
exports.default = HelloWorld;
