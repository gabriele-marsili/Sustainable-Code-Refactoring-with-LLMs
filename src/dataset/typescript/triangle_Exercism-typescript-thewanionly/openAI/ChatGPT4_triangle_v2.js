"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangle = void 0;
class Triangle {
    constructor(a, b, c) {
        this.sides = [a, b, c].sort((x, y) => x - y);
        this.perimeter = a + b + c;
    }
    isValid() {
        const [a, b, c] = this.sides;
        return a > 0 && a + b > c;
    }
    get isEquilateral() {
        const [a, b, c] = this.sides;
        return this.isValid() && a === b && b === c;
    }
    get isIsosceles() {
        const [a, b, c] = this.sides;
        return this.isValid() && (a === b || b === c || a === c);
    }
    get isScalene() {
        const [a, b, c] = this.sides;
        return this.isValid() && a !== b && b !== c && a !== c;
    }
}
exports.Triangle = Triangle;
