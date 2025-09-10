export default class PhoneNumber {
    private readonly _number: string | undefined;

    constructor(rawPhoneNumber: string) {
        const cleanedPhoneNumber = rawPhoneNumber.replace(/[^0-9]/g, '');

        const length = cleanedPhoneNumber.length;

        if (length === 10) {
            this._number = cleanedPhoneNumber;
        } else if (length === 11 && cleanedPhoneNumber.startsWith('1')) {
            this._number = cleanedPhoneNumber.slice(1);
        } else {
            this._number = undefined;
        }
    }

    number(): string | undefined {
        return this._number;
    }
}