"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPaired = isPaired;
const OPEN_BRACKETS = ['{', '[', '('];
const CLOSE_BRACKETS = ['}', ']', ')'];
function isOpenBrackets(s) {
    return OPEN_BRACKETS.includes(s);
}
function isCloseBrackets(s) {
    return CLOSE_BRACKETS.includes(s);
}
function isPaired(input) {
    let controlArr = [];
    for (let s = 0; s < input.length; s++) {
        if (isOpenBrackets(input[s])) {
            controlArr.push(input[s]);
        }
        if (isCloseBrackets(input[s])) {
            let closeIdx = CLOSE_BRACKETS.indexOf(input[s]);
            if (controlArr[controlArr.length - 1] === OPEN_BRACKETS[closeIdx]) {
                controlArr = controlArr.slice(0, controlArr.length - 1);
            }
            else {
                return false;
            }
        }
    }
    return controlArr.length === 0;
}
