function convert(OCR_string) {
    const OCR_lines = OCR_string.split("\n");
    const numLines = OCR_lines.length;
    const characters = [];

    for (let line = 0; line < numLines; line += 4) {
        const charLines = OCR_lines.slice(line, line + 4);
        const numChars = charLines[0].length / 3;
        const row = [];

        for (let c = 0; c < numChars; c++) {
            let character = "";
            for (let i = 0; i < 4; i++) {
                character += charLines[i].slice(c * 3, c * 3 + 3) + (i < 3 ? "\n" : "");
            }
            const digit = OCR_digits.indexOf(character);
            row.push(digit !== -1 ? digit.toString() : "?");
        }
        characters.push(row.join(""));
    }

    return characters.join(",");
}

const OCR_digits = [
    " _ \n" +
    "| |\n" +
    "|_|\n" +
    "   ",
    "   \n" +
    "  |\n" +
    "  |\n" +
    "   ",
    " _ \n" +
    " _|\n" +
    "|_ \n" +
    "   ",
    " _ \n" +
    " _|\n" +
    " _|\n" +
    "   ",
    "   \n" +
    "|_|\n" +
    "  |\n" +
    "   ",
    " _ \n" +
    "|_ \n" +
    " _|\n" +
    "   ",
    " _ \n" +
    "|_ \n" +
    "|_|\n" +
    "   ",
    " _ \n" +
    "  |\n" +
    "  |\n" +
    "   ",
    " _ \n" +
    "|_|\n" +
    "|_|\n" +
    "   ",
    " _ \n" +
    "|_|\n" +
    " _|\n" +
    "   ",
];

export default { convert: convert };