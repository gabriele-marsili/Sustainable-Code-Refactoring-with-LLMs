class Raindrops {
	convert(number) {
		const factorToSound = {
			3: "Pling",
			5: "Plang",
			7: "Plong",
		};

		let result = '';
		for (const factor in factorToSound) {
			if (number % factor === 0) {
				result += factorToSound[factor];
			}
		}

		return result || number.toString();
	}
}

module.exports = Raindrops;
