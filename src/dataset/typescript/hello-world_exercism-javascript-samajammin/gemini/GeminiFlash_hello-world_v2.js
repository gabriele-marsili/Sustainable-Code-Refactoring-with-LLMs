"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HelloWorld {
    static hello(name = HelloWorld.DEFAULT_NAME) {
        return `Hello, ${name}!`;
    }
}
HelloWorld.DEFAULT_NAME = 'World';
exports.default = HelloWorld;
