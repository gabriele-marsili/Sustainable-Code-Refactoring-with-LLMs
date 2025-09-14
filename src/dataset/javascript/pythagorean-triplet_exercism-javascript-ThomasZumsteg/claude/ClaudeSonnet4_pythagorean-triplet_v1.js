/* Finds pythagorean triplets */
var Triplet = function(a,b,c) { this.a = a; this.b = b; this.c = c; }

/* Sum of the sides of a triple */
Triplet.prototype.sum = function() { return this.a + this.b + this.c; };

/* Product of the sides of a triple */
Triplet.prototype.product = function() { return this.a * this.b * this.c; };

Triplet.prototype.isPythagorean = function() {
	/* Tests if the set of number is pythagorean */
	return (this.a*this.a) + (this.b*this.b) === (this.c*this.c);
};

Triplet.where = function(params) {
	/* Finds triplets with certain characterstics */
	var triplets = [];
	var minFactor = params.minFactor || 1;
	var maxFactor = params.maxFactor;
	var targetSum = params.sum;
	
	for(var a = minFactor; a <= maxFactor; a++) {
		var aSquared = a * a;
		for(var b = a; b <= maxFactor; b++) {
			var bSquared = b * b;
			var cSquared = aSquared + bSquared;
			var c = Math.sqrt(cSquared);
			
			if(c === Math.floor(c) && c >= b && c <= maxFactor) {
				if(!targetSum || (a + b + c === targetSum)) {
					triplets.push(new Triplet(a, b, c));
				}
			}
		}
	}
	return triplets;
};

export default Triplet;