function convert(OCR_string) {
  const OCR_lines = OCR_string.split("\n");
  const numLines = OCR_lines.length;
  const OCR_characters = [];

  for (let line = 0; line < numLines; line += 4) {
    OCR_characters.push(lines_to_characters(OCR_lines.slice(line, line + 4)));
  }

  return OCR_characters
    .map(row =>
      row
        .map(character => {
          const digit = OCR_digits.indexOf(character);
          return digit !== -1 ? digit.toString() : "?";
        })
        .join("")
    )
    .join(",");
}

function lines_to_characters(line) {
  const characters = [];
  const lineLength = line[0].length;
  const numChars = lineLength / 3;

  for (let c = 0; c < numChars; c++) {
    const charLines = [];
    for (let i = 0; i < line.length; i++) {
      charLines.push(line[i].slice(c * 3, c * 3 + 3));
    }
    characters.push(charLines.join("\n"));
  }
  return characters;
}

export default { convert: convert };

const OCR_digits = [
  " _ \n" + "|||\n" + "|_|\n" + "   ",
  "   \n" + "  |\n" + "  |\n" + "   ",
  " _ \n" + " _|\n" + "|_ \n" + "   ",
  " _ \n" + " _|\n" + " _|\n" + "   ",
  "   \n" + "|_|\n" + "  |\n" + "   ",
  " _ \n" + "|_ \n" + " _|\n" + "   ",
  " _ \n" + "|_ \n" + "|_|\n" + "   ",
  " _ \n" + "  |\n" + "  |\n" + "   ",
  " _ \n" + "|_|\n" + "|_|\n" + "   ",
  " _ \n" + "|_|\n" + " _|\n" + "   ",
];