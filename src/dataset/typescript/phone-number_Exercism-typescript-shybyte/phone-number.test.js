"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const phone_number_1 = __importDefault(require("./phone-number"));
describe('PhoneNumber()', () => {
    it('cleans the number', () => {
        const phone = new phone_number_1.default('(123) 456-7890');
        expect(phone.number()).toEqual('1234567890');
    });
    it('cleans numbers with dots', () => {
        const phone = new phone_number_1.default('123.456.7890');
        expect(phone.number()).toEqual('1234567890');
    });
    it('cleans numbers with multiple spaces', () => {
        const phone = new phone_number_1.default('123 456   7890   ');
        expect(phone.number()).toEqual('1234567890');
    });
    it('invalid when 9 digits', () => {
        const phone = new phone_number_1.default('123456789');
        expect(phone.number()).toEqual(undefined);
    });
    it('invalid when 11 digits', () => {
        const phone = new phone_number_1.default('21234567890');
        expect(phone.number()).toEqual(undefined);
    });
    it('valid when 11 digits and starting with 1', () => {
        const phone = new phone_number_1.default('11234567890');
        expect(phone.number()).toEqual('1234567890');
    });
    it('invalid when 12 digits', () => {
        const phone = new phone_number_1.default('321234567890');
        expect(phone.number()).toEqual(undefined);
    });
    it('invalid with letters', () => {
        const phone = new phone_number_1.default('123-abc-7890');
        expect(phone.number()).toEqual(undefined);
    });
    it('invalid with punctuations', () => {
        const phone = new phone_number_1.default('123-@:!-7890');
        expect(phone.number()).toEqual(undefined);
    });
    it('invalid with right number of digits but letters mixed in', () => {
        const phone = new phone_number_1.default('1a2b3c4d5e6f7g8h9i0j');
        expect(phone.number()).toEqual(undefined);
    });
});
