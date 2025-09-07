function validate(number) {
    const numStr = number.toString();
    const numDigits = numStr.length;
    let sum = 0;

    for (let i = 0; i < numDigits; i++) {
        const digit = parseInt(numStr[i], 10);
        let power = 1;
        for (let j = 0; j < numDigits; j++) {
            power *= digit;
        }
        sum += power;
        if (sum > number) return false;
    }

    return number === sum;
}

export default {validate: validate};