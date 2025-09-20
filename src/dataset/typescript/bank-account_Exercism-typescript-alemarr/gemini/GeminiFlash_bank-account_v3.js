"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccount = exports.ValueError = void 0;
class ValueError extends Error {
    constructor() {
        super('Bank account error');
        this.name = 'ValueError';
    }
}
exports.ValueError = ValueError;
class BankAccountStatus {
    constructor(_canOperate) {
        this._canOperate = _canOperate;
    }
    allowsOperations() {
        return this._canOperate;
    }
}
class Open extends BankAccountStatus {
    constructor() {
        super(true);
    }
}
class Closed extends BankAccountStatus {
    constructor() {
        super(false);
    }
}
class Money {
    constructor(amount) {
        this._amount = amount;
    }
    add(amount) {
        this._amount += amount;
        return this;
    }
    subtract(amount) {
        this._amount -= amount;
        return this;
    }
    get amount() {
        return this._amount;
    }
    set amount(amount) {
        this._amount = amount;
    }
}
class Balance {
    constructor(amount) {
        this._balance = new Money(amount);
    }
    add(amount) {
        if (amount < 0) {
            throw new ValueError();
        }
        this._balance.add(amount);
    }
    withdraw(amount) {
        if (amount < 0 || amount > this._balance.amount) {
            throw new ValueError();
        }
        this._balance.subtract(amount);
    }
    get balance() {
        return this._balance.amount;
    }
}
class BankAccount {
    constructor() {
        this._balance = new Balance(0);
        this._status = new Closed();
    }
    open() {
        if (this._status.allowsOperations()) {
            throw new ValueError();
        }
        this._status = new Open();
    }
    close() {
        if (!this._status.allowsOperations()) {
            throw new ValueError();
        }
        this.withdraw(this._balance.balance);
        this._status = new Closed();
    }
    deposit(amount) {
        if (!this._status.allowsOperations()) {
            throw new ValueError();
        }
        this._balance.add(amount);
    }
    withdraw(amount) {
        if (!this._status.allowsOperations()) {
            throw new ValueError();
        }
        this._balance.withdraw(amount);
    }
    get balance() {
        if (!this._status.allowsOperations()) {
            throw new ValueError();
        }
        return this._balance.balance;
    }
    set balance(balance) {
        throw new ValueError();
    }
}
exports.BankAccount = BankAccount;
