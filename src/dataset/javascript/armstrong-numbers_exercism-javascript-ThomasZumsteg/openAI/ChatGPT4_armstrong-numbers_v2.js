function validate(number) {
    const digits = number.toString();
    const length = digits.length;
    let sum = 0;

    for (let i = 0; i < length; i++) {
        sum += Math.pow(digits.charCodeAt(i) - 48, length);
        if (sum > number) return false; // Early exit if sum exceeds number
    }

    return sum === number;
}

export default { validate };