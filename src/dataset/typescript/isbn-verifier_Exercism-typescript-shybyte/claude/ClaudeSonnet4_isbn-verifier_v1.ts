function sum(array: number[]) {
    let total = 0;
    for (let i = 0; i < array.length; i++) {
        total += array[i];
    }
    return total;
}

export default class ISBN {
    private readonly isbnString: string

    public constructor(isbnString: string) {
        this.isbnString = isbnString
    }

    public isValid() {
        const cleanString = this.isbnString.replace(/-/g, '');
        const length = cleanString.length;
        
        if (length === 0) return false;
        
        let checkSum = 0;
        
        for (let i = 0; i < length; i++) {
            const char = cleanString[i];
            let digit: number;
            
            if (char === 'X' && i === length - 1) {
                digit = 10;
            } else if (char >= '0' && char <= '9') {
                digit = parseInt(char, 10);
            } else {
                return false;
            }
            
            checkSum += digit * (10 - i);
        }
        
        return checkSum % 11 === 0;
    }
}