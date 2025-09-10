function sum(array: number[]): number {
    let total = 0;
    for (const value of array) {
        total += value;
    }
    return total;
}

export default class ISBN {
    private readonly isbnString: string;

    public constructor(isbnString: string) {
        this.isbnString = isbnString;
    }

    public isValid(): boolean {
        const cleanIsbn = this.isbnString.replace(/-/g, '');
        const length = cleanIsbn.length;
        if (length === 0) return false;

        let checkSum = 0;
        for (let i = 0; i < length; i++) {
            const char = cleanIsbn[i];
            let digit = 0;

            if (char === 'X' && i === length - 1) {
                digit = 10;
            } else if (char >= '0' && char <= '9') {
                digit = char.charCodeAt(0) - 48; // Faster than parseInt
            } else {
                return false;
            }

            checkSum += digit * (10 - i);
        }

        return checkSum % 11 === 0;
    }
}