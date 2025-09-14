/* Decimal to Roman numeral mapping */
const decToNum = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
    [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]
];

function toRoman(remainder) {
    /* Convert a decimal number to a roman numeral */
    let result = '';
    
    for (let i = 0; i < decToNum.length; i++) {
        const [decimal, numeral] = decToNum[i];
        while (remainder >= decimal) {
            remainder -= decimal;
            result += numeral;
        }
    }
    
    return result;
}

export default toRoman;