"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HelloWorld {
    static hello(name = HelloWorld.defaultName) {
        return `Hello, ${name}!`;
    }
}
HelloWorld.defaultName = 'World';
exports.default = HelloWorld;
