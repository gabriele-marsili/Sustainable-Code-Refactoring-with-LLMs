"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplexNumber = void 0;
class ComplexNumber {
    constructor(_r, _i) {
        this._r = _r;
        this._i = _i;
    }
    get real() {
        return this._r;
    }
    get imag() {
        return this._i;
    }
    add({ _r, _i }) {
        return new ComplexNumber(this._r + _r, this._i + _i);
    }
    sub({ _r, _i }) {
        return new ComplexNumber(this._r - _r, this._i - _i);
    }
    div({ _r, _i }) {
        const denom = Math.pow(_r, 2) + Math.pow(_i, 2);
        const r = (this._r * _r + this._i * _i) / denom;
        const i = (this._i * _r - this._r * _i) / denom;
        return new ComplexNumber(r, i);
    }
    mul({ _r, _i }) {
        const r = this._r * _r - this._i * _i;
        const i = this._i * _r + this._r * _i;
        return new ComplexNumber(r, i);
    }
    get abs() {
        return Math.hypot(this._r, this._i);
    }
    get conj() {
        return new ComplexNumber(this._r, -this._i);
    }
    get exp() {
        const expReal = Math.exp(this._r);
        return new ComplexNumber(expReal * Math.cos(this._i), expReal * Math.sin(this._i));
    }
}
exports.ComplexNumber = ComplexNumber;
