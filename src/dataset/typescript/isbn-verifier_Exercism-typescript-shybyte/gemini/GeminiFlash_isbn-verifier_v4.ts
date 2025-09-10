function sum(array: number[]) {
    let s = 0;
    for (let i = 0; i < array.length; i++) {
        s += array[i];
    }
    return s;
}

export default class ISBN {
    private readonly isbnString: string

    public constructor(isbnString: string) {
        this.isbnString = isbnString
    }

    public isValid() {
        let isbn = this.isbnString.replace(/-/g, '');
        let len = isbn.length;

        if (len === 0) {
            return false;
        }

        let checkSum = 0;
        for (let i = 0; i < len; i++) {
            let char = isbn[i];
            let digit: number;

            if (char === 'X' && i === len - 1) {
                digit = 10;
            } else if (char >= '0' && char <= '9') {
                digit = char.charCodeAt(0) - '0'.charCodeAt(0);
            } else {
                return false;
            }

            checkSum += digit * (10 - i);
        }

        return checkSum % 11 === 0;
    }
}