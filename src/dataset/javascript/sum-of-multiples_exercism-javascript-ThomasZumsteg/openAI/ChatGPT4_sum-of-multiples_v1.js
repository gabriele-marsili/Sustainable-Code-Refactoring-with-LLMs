function to(num) {
	let total = 0;
	for (let n = 0; n < num; n++) {
		for (const mul of this.factors) {
			if (n % mul === 0) {
				total += n;
				break;
			}
		}
	}
	return total;
}

export default function (factors) {
	return {
		factors: factors || [3, 5],
		to: to,
	};
}