function convert(OCR_string) {
	const OCR_lines = OCR_string.split("\n");
	const results = [];
	
	for(let line = 0; line < OCR_lines.length; line += 4) {
		const characters = lines_to_characters(OCR_lines.slice(line, line + 4));
		let row = "";
		for(let i = 0; i < characters.length; i++) {
			const digit = OCR_digit_map.get(characters[i]);
			row += digit !== undefined ? digit : "?";
		}
		results.push(row);
	}
	
	return results.join(",");
}

function lines_to_characters(line) {
	const characters = [];
	const numChars = line[0].length / 3;
	
	for(let c = 0; c < numChars; c++) {
		const start = c * 3;
		const end = start + 3;
		let character = "";
		for(let i = 0; i < line.length; i++) {
			character += line[i].slice(start, end);
			if(i < line.length - 1) character += "\n";
		}
		characters.push(character);
	}
	return characters;
}

const OCR_digit_map = new Map([
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

export default {convert: convert};