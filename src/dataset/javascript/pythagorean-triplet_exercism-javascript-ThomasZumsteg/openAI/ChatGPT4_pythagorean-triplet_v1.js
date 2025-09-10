/* Finds pythagorean triplets */
var Triplet = function(a, b, c) { this.a = a, this.b = b, this.c = c };

/* Sum of the sides of a triple */
Triplet.prototype.sum = function() { return this.a + this.b + this.c; };

/* Product of the sides of a triple */
Triplet.prototype.product = function() { return this.a * this.b * this.c; };

Triplet.prototype.isPythagorean = function() {
	/* Tests if the set of number is pythagorean */
	return (this.a * this.a) + (this.b * this.b) === (this.c * this.c);
};

Triplet.where = function(params) {
	/* Finds triplets with certain characteristics */
	const triplets = [];
	const minFactor = params.minFactor || 1;
	const maxFactor = params.maxFactor;

	for (let a = minFactor; a <= maxFactor - 2; a++) {
		for (let b = a + 1; b <= maxFactor - 1; b++) {
			const c = Math.sqrt(a * a + b * b);
			if (c % 1 === 0 && c <= maxFactor) {
				const t = new Triplet(a, b, c);
				if (!params.sum || params.sum === t.sum()) {
					triplets.push(t);
				}
			}
		}
	}
	return triplets;
};

export default Triplet;