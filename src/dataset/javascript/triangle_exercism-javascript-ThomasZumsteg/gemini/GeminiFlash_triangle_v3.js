/* Classifies triangles */
var Triangle = function(a,b,c) {
    this.triangle = [a,b,c].sort((x, y) => x - y);
};

Triangle.prototype.kind = function() {
    // Sides from smallest to largest
    const a = this.triangle[0];
    const b = this.triangle[1];
    const c = this.triangle[2];

    // Validation
    if (a <= 0) {
        throw new Error("Only positive length sides are allowed");
    }
    if (a + b <= c) {
        throw new Error("Not a valid triangle");
    }

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