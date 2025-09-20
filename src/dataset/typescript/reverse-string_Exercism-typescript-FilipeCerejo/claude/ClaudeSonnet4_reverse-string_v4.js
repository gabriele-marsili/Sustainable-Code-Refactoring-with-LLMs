"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reverse = reverse;
function reverse(chars) {
    const charArray = chars.split('');
    let left = 0;
    let right = charArray.length - 1;
    while (left < right) {
        const temp = charArray[left];
        charArray[left] = charArray[right];
        charArray[right] = temp;
        left++;
        right--;
    }
    return charArray.join('');
}
