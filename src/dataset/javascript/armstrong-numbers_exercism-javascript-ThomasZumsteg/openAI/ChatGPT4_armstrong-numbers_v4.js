function validate(number) {
    const strNum = String(number);
    const len = strNum.length;
    let sum = 0;
    for (let i = 0; i < len; i++) {
        sum += Math.pow(+strNum[i], len);
        if (sum > number) return false;
    }
    return sum === number;
}

export default { validate };