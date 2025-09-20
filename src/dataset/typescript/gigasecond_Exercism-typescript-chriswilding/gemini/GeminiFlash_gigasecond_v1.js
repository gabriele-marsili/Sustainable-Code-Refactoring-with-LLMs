"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GIGASECOND_MS = 1000000000000;
class Gigasecond {
    constructor(birthDate) {
        this.birthTimeMs = birthDate.getTime();
    }
    date() {
        return new Date(this.birthTimeMs + GIGASECOND_MS);
    }
}
exports.default = Gigasecond;
