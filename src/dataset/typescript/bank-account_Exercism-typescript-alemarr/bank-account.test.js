"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bank_account_1 = require("./bank-account");
describe('Bank Account', () => {
    it('newly opened account has zero balance', () => {
        const account = new bank_account_1.BankAccount();
        account.open();
        expect(account.balance).toEqual(0);
    });
    it('can deposit money', () => {
        const account = new bank_account_1.BankAccount();
        account.open();
        account.deposit(100);
        expect(account.balance).toEqual(100);
    });
    it('can deposit money sequentially', () => {
        const account = new bank_account_1.BankAccount();
        account.open();
        account.deposit(100);
        account.deposit(50);
        expect(account.balance).toEqual(150);
    });
    it('can withdraw money', () => {
        const account = new bank_account_1.BankAccount();
        account.open();
        account.deposit(100);
        account.withdraw(50);
        expect(account.balance).toEqual(50);
    });
    it('can withdraw money sequentially', () => {
        const account = new bank_account_1.BankAccount();
        account.open();
        account.deposit(100);
        account.withdraw(20);
        account.withdraw(80);
        expect(account.balance).toEqual(0);
    });
    it('checking balance of closed account throws error', () => {
        const account = new bank_account_1.BankAccount();
        account.open();
        account.close();
        expect(() => account.balance).toThrow(bank_account_1.ValueError);
    });
    it('deposit into closed account throws error', () => {
        const account = new bank_account_1.BankAccount();
        account.open();
        account.close();
        expect(() => {
            account.deposit(50);
        }).toThrow(bank_account_1.ValueError);
    });
    it('withdraw from closed account throws error', () => {
        const account = new bank_account_1.BankAccount();
        account.open();
        account.close();
        expect(() => {
            account.withdraw(50);
        }).toThrow(bank_account_1.ValueError);
    });
    it('close already closed account throws error', () => {
        const account = new bank_account_1.BankAccount();
        expect(() => {
            account.close();
        }).toThrow(bank_account_1.ValueError);
    });
    it('open already opened account throws error', () => {
        const account = new bank_account_1.BankAccount();
        account.open();
        expect(() => {
            account.open();
        }).toThrow(bank_account_1.ValueError);
    });
    it('reopened account does not retain balance', () => {
        const account = new bank_account_1.BankAccount();
        account.open();
        account.deposit(50);
        account.close();
        account.open();
        expect(account.balance).toEqual(0);
    });
    it('cannot withdraw more than deposited', () => {
        const account = new bank_account_1.BankAccount();
        account.open();
        account.deposit(25);
        expect(() => {
            account.withdraw(50);
        }).toThrow(bank_account_1.ValueError);
    });
    it('cannot withdraw negative amount', () => {
        const account = new bank_account_1.BankAccount();
        account.open();
        account.deposit(100);
        expect(() => {
            account.withdraw(-50);
        }).toThrow(bank_account_1.ValueError);
    });
    it('cannot deposit negative amount', () => {
        const account = new bank_account_1.BankAccount();
        account.open();
        expect(() => {
            account.deposit(-50);
        }).toThrow(bank_account_1.ValueError);
    });
    it('changing balance directly throws error', () => {
        const account = new bank_account_1.BankAccount();
        account.open();
        expect(() => {
            account.balance = 100;
        }).toThrow(Error);
    });
});
