"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccount = exports.ValueError = void 0;
class ValueError extends Error {
    constructor() {
        super('Bank account error');
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
    constructor(_amount) {
        this._amount = _amount;
    }
    add(amount) {
        return new Money(this._amount + amount);
    }
    subtract(amount) {
        return new Money(this._amount - amount);
    }
    get amount() {
        return this._amount;
    }
}
class Balance {
    constructor(amount) {
        if (amount < 0)
            throw new ValueError();
        this._balance = new Money(amount);
    }
    add(amount) {
        if (amount < 0)
            throw new ValueError();
        this._balance = this._balance.add(amount);
    }
    withdraw(amount) {
        if (amount < 0 || amount > this._balance.amount)
            throw new ValueError();
        this._balance = this._balance.subtract(amount);
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
        if (this._status.allowsOperations())
            throw new ValueError();
        this._status = new Open();
    }
    close() {
        if (!this._status.allowsOperations())
            throw new ValueError();
        this._balance = new Balance(0);
        this._status = new Closed();
    }
    deposit(amount) {
        if (!this._status.allowsOperations())
            throw new ValueError();
        this._balance.add(amount);
    }
    withdraw(amount) {
        if (!this._status.allowsOperations())
            throw new ValueError();
        this._balance.withdraw(amount);
    }
    get balance() {
        if (!this._status.allowsOperations())
            throw new ValueError();
        return this._balance.balance;
    }
    set balance(_) {
        throw new ValueError();
    }
}
exports.BankAccount = BankAccount;
