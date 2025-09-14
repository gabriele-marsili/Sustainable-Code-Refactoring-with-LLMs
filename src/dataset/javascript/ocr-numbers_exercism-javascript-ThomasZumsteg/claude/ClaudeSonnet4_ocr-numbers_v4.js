const OCR_digits = [
	" _ \n| |\n|_|\n   ",
	"   \n  |\n  |\n   ",
	" _ \n _|\n|_ \n   ",
	" _ \n _|\n _|\n   ",
	"   \n|_|\n  |\n   ",
	" _ \n|_ \n _|\n   ",
	" _ \n|_ \n|_|\n   ",
	" _ \n  |\n  |\n   ",
	" _ \n|_|\n|_|\n   ",
	" _ \n|_|\n _|\n   "
];

const OCR_digits_map = new Map(OCR_digits.map((digit, index) => [digit, index.toString()]));

function convert(OCR_string) {
	const OCR_lines = OCR_string.split("\n");
	const OCR_characters = [];
	
	for (let line = 0; line < OCR_lines.length; line += 4) {
		OCR_characters.push(lines_to_characters(OCR_lines.slice(line, line + 4)));
	}

	return OCR_characters.map(row => 
		row.map(character => OCR_digits_map.get(character) || "?").join("")
	).join(",");
}

function lines_to_characters(line) {
	const characters = [];
	const numChars = line[0].length / 3;
	
	for (let c = 0; c < numChars; c++) {
		const start = c * 3;
		const end = start + 3;
		characters.push(
			line[0].slice(start, end) + "\n" +
			line[1].slice(start, end) + "\n" +
			line[2].slice(start, end) + "\n" +
			line[3].slice(start, end)
		);
	}
	
	return characters;
}

export default { convert };