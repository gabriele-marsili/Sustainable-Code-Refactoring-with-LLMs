/* Classifies triangles */
var Triangle = function(a,b,c) { this.triangle = [a,b,c].sort((x, y) => x - y); }

Triangle.prototype.kind = function() {
	/* Determines the type of triangle */

	// Sides from smallest to largest
	var a = this.triangle[0];
	var b = this.triangle[1];
	var c = this.triangle[2];

	// Validation
	if (a <= 0) 
		throw "Only positive length sides are allowed";
	if (a + b <= c)
		throw "Not a valid triangle";

	// Classification
	if (a === b) {
		if (b === c) {
			return "equilateral";
		}
		return "isosceles";
	}
	if (b === c) {
		return "isosceles";
	}
	return "scalene";
};

export default Triangle;