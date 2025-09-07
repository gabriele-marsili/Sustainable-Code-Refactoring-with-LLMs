function validate(number) {
    const str = number.toString();
    const length = str.length;
    let sum = 0;
    
    for (let i = 0; i < length; i++) {
        const digit = str.charCodeAt(i) - 48; // Convert char to digit without parseInt
        sum += digit ** length; // Use exponentiation operator instead of Math.pow
    }
    
    return number === sum;
}

export default {validate: validate};