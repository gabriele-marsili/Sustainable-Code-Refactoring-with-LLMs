"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HelloWorld {
    static hello(name = HelloWorld.DEFAULT_NAME) {
        return HelloWorld.HELLO_PREFIX + name + HelloWorld.HELLO_SUFFIX;
    }
}
HelloWorld.HELLO_PREFIX = 'Hello, ';
HelloWorld.HELLO_SUFFIX = '!';
HelloWorld.DEFAULT_NAME = 'World';
exports.default = HelloWorld;
