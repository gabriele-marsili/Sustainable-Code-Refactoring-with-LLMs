export default class ISBN {
    private readonly isbnString: string;

    public constructor(isbnString: string) {
        this.isbnString = isbnString;
    }

    public isValid(): boolean {
        let cleanedIsbn = this.isbnString.replace(/-/g, '');
        const length = cleanedIsbn.length;

        if (length === 0) {
            return false;
        }

        let sum = 0;
        for (let i = 0; i < length; i++) {
            const char = cleanedIsbn[i];
            let digit: number;

            if (char === 'X' && i === length - 1) {
                digit = 10;
            } else if (char >= '0' && char <= '9') {
                digit = char.charCodeAt(0) - '0'.charCodeAt(0);
            } else {
                return false;
            }

            sum += digit * (10 - i);
        }

        return sum % 11 === 0;
    }
}