function convert(OCR_string) {
	const OCR_lines = OCR_string.split("\n");
	const OCR_characters = [];

	for (let line = 0; line < OCR_lines.length; line += 4) {
		OCR_characters.push(lines_to_characters(OCR_lines.slice(line, line + 4)));
	}

	return OCR_characters
		.map(row => row.map(character => OCR_digits_map[character] || "?").join(""))
		.join(",");
}

function lines_to_characters(lines) {
	const characters = [];
	const length = lines[0].length;

	for (let c = 0; c < length; c += 3) {
		characters.push(lines.map(row => row.slice(c, c + 3)).join("\n"));
	}

	return characters;
}

const OCR_digits_map = {
	" _ \n| |\n|_|\n   ": "0",
	"   \n  |\n  |\n   ": "1",
	" _ \n _|\n|_ \n   ": "2",
	" _ \n _|\n _|\n   ": "3",
	"   \n|_|\n  |\n   ": "4",
	" _ \n|_ \n _|\n   ": "5",
	" _ \n|_ \n|_|\n   ": "6",
	" _ \n  |\n  |\n   ": "7",
	" _ \n|_|\n|_|\n   ": "8",
	" _ \n|_|\n _|\n   ": "9",
};

export default { convert };