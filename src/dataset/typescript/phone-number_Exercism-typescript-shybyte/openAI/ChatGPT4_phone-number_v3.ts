export default class PhoneNumber {
    private readonly _number?: string;

    constructor(rawPhoneNumber: string) {
        const sanitized = rawPhoneNumber.replace(/[^0-9]/g, '');
        this._number = sanitized.length === 10 
            ? sanitized 
            : (sanitized.length === 11 && sanitized[0] === '1' ? sanitized.slice(1) : undefined);
    }

    number(): string | undefined {
        return this._number;
    }
}