/* Classifies triangles */
var Triangle = function(a,b,c) {
    if (a <= 0 || b <= 0 || c <= 0) {
        throw "Only positive length sides are allowed";
    }

    if (a + b <= c || a + c <= b || b + c <= a) {
        throw "Not a valid triangle";
    }

    this.triangle = [a,b,c].sort((x, y) => x - y);
}

Triangle.prototype.kind = function() {
	/* Determines the type of triangle */

	// Sides from smallest to largest
	var a = this.triangle[0];
	var b = this.triangle[1];
	var c = this.triangle[2];

	// Classification
	if (a === b) {
        if (b === c) {
            return "equilateral";
        } else {
            return "isosceles";
        }
    } else if (b === c) {
        return "isosceles";
    } else {
        return "scalene";
    }
};

export default Triangle;