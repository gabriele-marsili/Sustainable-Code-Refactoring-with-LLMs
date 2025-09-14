function convert(OCR_string) {
	/* Convert a line representation of digits into a string of digits */
	const OCR_lines = OCR_string.split("\n");
	const results = [];
	
	for(let line = 0; line < OCR_lines.length; line += 4) {
		const characters = lines_to_characters(OCR_lines.slice(line, line + 4));
		const digits = [];
		
		for(let i = 0; i < characters.length; i++) {
			const digit = OCR_digits.indexOf(characters[i]);
			digits.push(digit !== -1 ? digit.toString() : "?");
		}
		
		results.push(digits.join(""));
	}

	return results.join(",");
}

function lines_to_characters(line) {
	/* Divides a set of lines into characters */
	const characters = [];
	const numChars = line[0].length / 3;
	
	for(let c = 0; c < numChars; c++) {
		const charLines = [];
		for(let i = 0; i < line.length; i++) {
			charLines.push(line[i].slice(c * 3, c * 3 + 3));
		}
		characters.push(charLines.join("\n"));
	}
	
	return characters;
}

export default {convert: convert};

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