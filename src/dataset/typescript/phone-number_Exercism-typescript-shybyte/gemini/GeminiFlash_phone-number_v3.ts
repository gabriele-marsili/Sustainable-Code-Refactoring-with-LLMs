export default class PhoneNumber {
    private readonly _number: string | undefined;

    constructor(rawPhoneNumber: string) {
        if (!/^[\d.()\-\s]+$/.test(rawPhoneNumber)) {
            return;
        }

        let numbersOnly = '';
        for (let i = 0; i < rawPhoneNumber.length; i++) {
            const char = rawPhoneNumber[i];
            if (char >= '0' && char <= '9') {
                numbersOnly += char;
            }
        }

        const length = numbersOnly.length;
        if (length === 10) {
            this._number = numbersOnly;
        } else if (length === 11 && numbersOnly.startsWith('1')) {
            this._number = numbersOnly.substring(1);
        }
    }

    number() {
        return this._number;
    }
}