"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Gigasecond {
    constructor(initDate) {
        this.initTimeMs = initDate.getTime();
    }
    date() {
        return new Date(this.initTimeMs + 1000000000000);
    }
}
exports.default = Gigasecond;
