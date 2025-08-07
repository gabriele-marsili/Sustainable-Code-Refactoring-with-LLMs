class Year {
    constructor(input) {
        this.year = input;
    }

    isLeap() {
        const y = this.year;
        return (y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0));
    }
}

export default Year;