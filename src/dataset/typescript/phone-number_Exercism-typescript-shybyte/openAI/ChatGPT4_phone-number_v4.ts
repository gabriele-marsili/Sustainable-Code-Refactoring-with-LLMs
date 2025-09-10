export default class PhoneNumber {
    private readonly _number: string | undefined;

    constructor(rawPhoneNumber: string) {
        const cleaned = rawPhoneNumber.replace(/[^0-9]/g, '');
        this._number = cleaned.length === 10 ? cleaned : (cleaned.length === 11 && cleaned[0] === '1' ? cleaned.slice(1) : undefined);
    }

    number() {
        return this._number;
    }
}