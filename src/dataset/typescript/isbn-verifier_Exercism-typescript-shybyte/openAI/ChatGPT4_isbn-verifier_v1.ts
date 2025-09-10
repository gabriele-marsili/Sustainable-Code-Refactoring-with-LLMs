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
        const cleanString = this.isbnString.replace(/-/g, '');
        let checkSum = 0;
        let validLength = 0;

        for (let i = 0; i < cleanString.length; i++) {
            const char = cleanString[i];
            let digit;

            if (char === 'X' && i === cleanString.length - 1) {
                digit = 10;
            } else if (char >= '0' && char <= '9') {
                digit = char.charCodeAt(0) - 48; // Faster than parseInt
            } else {
                return false; // Invalid character
            }

            checkSum += digit * (10 - i);
            validLength++;
        }

        return validLength === 10 && checkSum % 11 === 0;
    }
}