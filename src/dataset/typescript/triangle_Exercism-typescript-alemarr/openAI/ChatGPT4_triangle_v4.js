"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangle = void 0;
class Triangle {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
    get isEquilateral() {
        return this.isValid() && this.a === this.b && this.b === this.c;
    }
    get isIsosceles() {
        return this.isValid() && (this.a === this.b || this.b === this.c || this.a === this.c);
    }
    get isScalene() {
        return this.isValid() && this.a !== this.b && this.b !== this.c && this.a !== this.c;
    }
    isValid() {
        return (this.a > 0 &&
            this.b > 0 &&
            this.c > 0 &&
            this.a + this.b > this.c &&
            this.b + this.c > this.a &&
            this.c + this.a > this.b);
    }
}
exports.Triangle = Triangle;
