"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReverseString {
    static reverse(str) {
        if (str.length <= 1)
            return str;
        const chars = str.split('');
        let left = 0;
        let right = chars.length - 1;
        while (left < right) {
            const temp = chars[left];
            chars[left] = chars[right];
            chars[right] = temp;
            left++;
            right--;
        }
        return chars.join('');
    }
}
exports.default = ReverseString;
