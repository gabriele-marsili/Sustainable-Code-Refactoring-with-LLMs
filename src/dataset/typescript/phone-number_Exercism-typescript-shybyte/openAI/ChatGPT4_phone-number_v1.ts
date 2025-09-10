export default class PhoneNumber {
    private readonly _number: string | undefined;

    constructor(rawPhoneNumber: string) {
        const numbersOnly = rawPhoneNumber.replace(/\D/g, '');
        if (numbersOnly.length === 10) {
            this._number = numbersOnly;
        } else if (numbersOnly.length === 11 && numbersOnly[0] === '1') {
            this._number = numbersOnly.slice(1);
        }
    }

    number() {
        return this._number;
    }
}