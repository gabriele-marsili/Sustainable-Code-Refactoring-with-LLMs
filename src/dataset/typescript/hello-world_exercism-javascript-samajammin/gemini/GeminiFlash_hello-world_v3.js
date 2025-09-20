"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HelloWorld {
    static hello(name = 'World') {
        return `${HelloWorld.greeting}${name}${HelloWorld.exclamation}`;
    }
}
HelloWorld.greeting = "Hello, ";
HelloWorld.exclamation = "!";
exports.default = HelloWorld;
