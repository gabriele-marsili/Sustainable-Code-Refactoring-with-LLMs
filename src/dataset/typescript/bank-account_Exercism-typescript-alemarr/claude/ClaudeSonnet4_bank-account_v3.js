"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccount = exports.ValueError = void 0;
class ValueError extends Error {
    constructor() {
        super('Bank account error');
    }
}
exports.ValueError = ValueError;
class BankAccount {
    constructor() {
        this._balance = 0;
        this._isOpen = false;
    }
    open() {
        if (this._isOpen) {
            throw new ValueError();
        }
        this._isOpen = true;
    }
    close() {
        if (!this._isOpen) {
            throw new ValueError();
        }
        this._balance = 0;
        this._isOpen = false;
    }
    deposit(amount) {
        if (!this._isOpen) {
            throw new ValueError();
        }
        if (amount < 0) {
            throw new ValueError();
        }
        this._balance += amount;
    }
    withdraw(amount) {
        if (!this._isOpen) {
            throw new ValueError();
        }
        if (amount < 0 || amount > this._balance) {
            throw new ValueError();
        }
        this._balance -= amount;
    }
    get balance() {
        if (!this._isOpen) {
            throw new ValueError();
        }
        return this._balance;
    }
    set balance(balance) {
        throw new ValueError();
    }
}
exports.BankAccount = BankAccount;
