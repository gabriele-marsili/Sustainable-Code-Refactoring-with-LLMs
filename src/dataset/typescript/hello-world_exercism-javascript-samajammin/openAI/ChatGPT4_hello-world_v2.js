"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HelloWorld {
    static hello(name) {
        return `Hello, ${name !== null && name !== void 0 ? name : 'World'}!`;
    }
}
exports.default = HelloWorld;
