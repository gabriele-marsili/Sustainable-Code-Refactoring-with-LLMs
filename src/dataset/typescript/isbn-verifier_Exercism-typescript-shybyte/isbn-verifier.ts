function sum(array: number[]) {
    return array.reduce((s, value) => s + value, 0)
}

export default class ISBN {
    private readonly isbnString: string

    public constructor(isbnString: string) {
        this.isbnString = isbnString
    }

    public isValid() {
        const chars = [...this.isbnString.replace(/-/g, '')]
        const digits = chars.map((d, i) => {
            if (d === 'X' && i === chars.length - 1) {
                return 10
            } else if (d.match(/\d/)) {
                return parseInt(d, 10)
            } else {
                return NaN
            }
        })
        const checkSum = sum(digits.map((d, i) => d * (10 - i))) % 11
        return digits.length > 0 && checkSum === 0
    }
}
