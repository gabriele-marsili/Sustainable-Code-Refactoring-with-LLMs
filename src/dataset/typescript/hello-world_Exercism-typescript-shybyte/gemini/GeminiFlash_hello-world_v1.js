"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HelloWorld {
    static hello(name = HelloWorld.DEFAULT_NAME) {
        return HelloWorld.HELLO_STRING + name + HelloWorld.EXCLAMATION_MARK;
    }
}
HelloWorld.DEFAULT_NAME = 'World';
HelloWorld.HELLO_STRING = 'Hello, ';
HelloWorld.EXCLAMATION_MARK = '!';
exports.default = HelloWorld;
