/* Finds pythagorean triplets */
var Triplet = function(a,b,c) { this.a = a, this.b = b, this.c = c }

/* Sum of the sides of a triple */
Triplet.prototype.sum = function() { return this.a + this.b + this.c };

/* Product of the sides of a triple */
Triplet.prototype.product = function() { return this.a * this.b * this.c };

Triplet.prototype.isPythagorean = function() {
	/* Tests if the set of number is pythagorean */
	return (this.a*this.a) + (this.b*this.b) === (this.c*this.c);
};

Triplet.where = function(params) {
	/* Finds triplets with certain characterstics */
	var triplets = [];
	let minFactor = params.minFactor || 1;
	let maxFactor = params.maxFactor;
	let sum = params.sum;

	for(let a = minFactor; a <= maxFactor; a++) {
		for(let b = a; b <= maxFactor; b++) {
			let a2 = a * a;
			let b2 = b * b;
			let c2 = a2 + b2;
			let c = Math.sqrt(c2);

			if (c > maxFactor || c !== Math.floor(c)) {
				continue;
			}

			let t = new Triplet(a, b, c);

			if (sum === undefined || sum === t.sum()) {
				triplets.push(t);
			}
		}
	}
	return triplets;
};

export default Triplet;