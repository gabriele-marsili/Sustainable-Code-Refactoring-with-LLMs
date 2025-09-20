"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HelloWorld {
    static hello(name = HelloWorld.DEFAULT_NAME) {
        return name === HelloWorld.DEFAULT_NAME
            ? HelloWorld.DEFAULT_GREETING
            : HelloWorld.HELLO_PREFIX + name + HelloWorld.HELLO_SUFFIX;
    }
}
HelloWorld.HELLO_PREFIX = 'Hello, ';
HelloWorld.HELLO_SUFFIX = '!';
HelloWorld.DEFAULT_NAME = 'World';
HelloWorld.DEFAULT_GREETING = 'Hello, World!';
exports.default = HelloWorld;
