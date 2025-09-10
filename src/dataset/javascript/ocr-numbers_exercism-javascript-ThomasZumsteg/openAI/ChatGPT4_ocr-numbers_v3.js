function convert(OCR_string) {
	const OCR_lines = OCR_string.split("\n");
	const OCR_characters = [];

	for (let line = 0; line < OCR_lines.length; line += 4) {
		OCR_characters.push(lines_to_characters(OCR_lines.slice(line, line + 4)));
	}

	return OCR_characters
		.map(row => row.map(character => {
			const digit = OCR_digits.indexOf(character);
			return digit !== -1 ? digit.toString() : "?";
		}).join(""))
		.join(",");
}

function lines_to_characters(lines) {
	const characters = [];
	const charCount = Math.floor(lines[0].length / 3);

	for (let c = 0; c < charCount; c++) {
		characters.push(lines.map(row => row.slice(c * 3, c * 3 + 3)).join("\n"));
	}

	return characters;
}

export default { convert };

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
	" _ \n|_|\n _|\n   ",
];