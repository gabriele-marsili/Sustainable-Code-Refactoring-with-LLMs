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
	var minFactor = params.minFactor || 1;
	var maxFactor = params.maxFactor;
	var sum = params.sum;

	for(var a = minFactor; a <= maxFactor - 2; a++) {
		for(var b = a + 1; b <= maxFactor - 1; b++) {
			var cSquared = a * a + b * b;
			var c = Math.sqrt(cSquared);

			if (c > maxFactor || c !== Math.floor(c)) {
				continue;
			}

			var t = new Triplet(a, b, c);

			if (sum === undefined || sum === t.sum()) {
				triplets.push(t);
			}
		}
	}
	return triplets;
};

export default Triplet;