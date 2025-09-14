/* Classifies triangles */
var Triangle = function(a,b,c) { 
    // Sort once during construction and store directly
    if (a > b) [a, b] = [b, a];
    if (b > c) [b, c] = [c, b];
    if (a > b) [a, b] = [b, a];
    this.triangle = [a, b, c];
}

Triangle.prototype.kind = function() {
    /* Determines the type of triangle */

    // Direct access to sorted sides
    var a = this.triangle[0];
    var b = this.triangle[1];
    var c = this.triangle[2];

    // Validation - fail fast
    if (a <= 0) 
        throw "Only positive length sides are allowed";
    if (a + b <= c)
        throw "Not a valid triangle";

    // Classification - most specific first
    if (a === b && b === c)
        return "equilateral";
    if (a === b || b === c)
        return "isosceles";
    return "scalene";
};

export default Triangle;