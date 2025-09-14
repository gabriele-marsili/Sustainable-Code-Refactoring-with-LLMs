const OCR_DIGITS = new Map([
    [" _ \n| |\n|_|\n   ", "0"],
    ["   \n  |\n  |\n   ", "1"],
    [" _ \n _|\n|_ \n   ", "2"],
    [" _ \n _|\n _|\n   ", "3"],
    ["   \n|_|\n  |\n   ", "4"],
    [" _ \n|_ \n _|\n   ", "5"],
    [" _ \n|_ \n|_|\n   ", "6"],
    [" _ \n  |\n  |\n   ", "7"],
    [" _ \n|_|\n|_|\n   ", "8"],
    [" _ \n|_|\n _|\n   ", "9"]
]);

function convert(OCR_string) {
    const OCR_lines = OCR_string.split("\n");
    const results = [];
    
    for (let line = 0; line < OCR_lines.length; line += 4) {
        const characters = lines_to_characters(OCR_lines.slice(line, line + 4));
        const digits = [];
        
        for (let i = 0; i < characters.length; i++) {
            const digit = OCR_DIGITS.get(characters[i]);
            digits.push(digit || "?");
        }
        
        results.push(digits.join(""));
    }
    
    return results.join(",");
}

function lines_to_characters(line) {
    const numChars = Math.floor(line[0].length / 3);
    const characters = new Array(numChars);
    
    for (let c = 0; c < numChars; c++) {
        const start = c * 3;
        const end = start + 3;
        const charLines = new Array(4);
        
        for (let i = 0; i < 4; i++) {
            charLines[i] = line[i].slice(start, end);
        }
        
        characters[c] = charLines.join("\n");
    }
    
    return characters;
}

export default { convert: convert };