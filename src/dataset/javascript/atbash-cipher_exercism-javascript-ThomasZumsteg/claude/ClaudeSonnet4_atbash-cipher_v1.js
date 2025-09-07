const a_ascii = 97; // 'a'.charCodeAt(0)
const z_ascii = 122; // 'z'.charCodeAt(0)

function encode(clear_text) {
	let result = '';
	let groupCount = 0;
	
	for (let i = 0; i < clear_text.length; i++) {
		const char = clear_text[i];
		const ascii = char.charCodeAt(0);
		
		if ((ascii >= 65 && ascii <= 90) || (ascii >= 97 && ascii <= 122)) {
			const lowerAscii = ascii >= 97 ? ascii : ascii + 32;
			result += String.fromCharCode(z_ascii - (lowerAscii - a_ascii));
		} else if (ascii >= 48 && ascii <= 57) {
			result += char;
		}
		
		groupCount++;
		if (groupCount === 5 && i < clear_text.length - 1) {
			result += ' ';
			groupCount = 0;
		}
	}
	
	return result;
}

export { encode };