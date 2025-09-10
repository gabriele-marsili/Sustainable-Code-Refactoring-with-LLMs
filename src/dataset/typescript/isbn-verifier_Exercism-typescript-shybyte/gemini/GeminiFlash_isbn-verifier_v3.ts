export default class ISBN {
    private readonly isbnString: string

    public constructor(isbnString: string) {
        this.isbnString = isbnString
    }

    public isValid() {
        let sum = 0;
        let count = 0;
        let digit;
        const isbn = this.isbnString.replace(/-/g, '');
        const len = isbn.length;

        if (len === 0) {
            return false;
        }

        for (let i = 0; i < len; i++) {
            const char = isbn[i];

            if (char === 'X' && i === len - 1) {
                digit = 10;
            } else if (char >= '0' && char <= '9') {
                digit = char.charCodeAt(0) - '0'.charCodeAt(0);
            } else {
                return false;
            }

            sum += digit * (10 - i);
            count++;
        }

        return count > 0 && sum % 11 === 0;
    }
}