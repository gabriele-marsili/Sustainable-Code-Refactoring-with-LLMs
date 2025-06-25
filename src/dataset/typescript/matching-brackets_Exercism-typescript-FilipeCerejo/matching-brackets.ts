const OPEN_BRACKETS = ['{', '[', '('] as const;
type BracketsOppeningType = typeof OPEN_BRACKETS;
type BracketOpenType = BracketsOppeningType[number];

const CLOSE_BRACKETS = ['}', ']', ')'] as const;
type BracketsClosingType = typeof CLOSE_BRACKETS;
type BracketClosingType = BracketsClosingType[number];

function isOpenBrackets(s: string): s is BracketOpenType {
    return OPEN_BRACKETS.includes(s as BracketOpenType);
}

function isCloseBrackets(s: string): s is BracketClosingType {
    return CLOSE_BRACKETS.includes(s as BracketClosingType);
}

export function isPaired(input: string): boolean {
    let controlArr: string[] = [];
    for (let s = 0; s < input.length; s++) {
        if (isOpenBrackets(input[s])) {
            controlArr.push(input[s]);
        }
        if (isCloseBrackets(input[s])) {
            let closeIdx = CLOSE_BRACKETS.indexOf(input[s] as BracketClosingType);
            if (controlArr[controlArr.length - 1] === OPEN_BRACKETS[closeIdx]) {
                controlArr = controlArr.slice(0, controlArr.length - 1);
            } else {
                return false;
            }
        }
    }
    return controlArr.length === 0;
}