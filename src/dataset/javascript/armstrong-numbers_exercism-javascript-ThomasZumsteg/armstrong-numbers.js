function validate(number) {
    var digits = number.toString().split('');
    return number == digits.reduce((acc, num) =>
        Math.pow(parseInt(num), digits.length) + acc, 0);
}

export default {validate: validate};;
