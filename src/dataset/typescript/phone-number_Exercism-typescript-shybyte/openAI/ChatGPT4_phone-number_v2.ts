export default class PhoneNumber {
    private readonly _number: string | null = null;

    constructor(rawPhoneNumber: string) {
        const cleaned = rawPhoneNumber.replace(/[^0-9]/g, '');
        if (cleaned.length === 10) {
            this._number = cleaned;
        } else if (cleaned.length === 11 && cleaned[0] === '1') {
            this._number = cleaned.slice(1);
        }
    }

    number(): string | null {
        return this._number;
    }
}