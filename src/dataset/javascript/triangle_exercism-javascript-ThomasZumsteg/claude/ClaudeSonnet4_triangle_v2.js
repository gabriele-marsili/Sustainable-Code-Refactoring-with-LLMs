/* Classifies triangles */
var Triangle = function(a,b,c) { 
    // Validate inputs early to avoid unnecessary sorting
    if (a <= 0 || b <= 0 || c <= 0) 
        throw "Only positive length sides are allowed";
    
    // Sort once during construction
    this.triangle = [a,b,c].sort((x,y) => x - y);
    
    // Cache validation result
    var [min, mid, max] = this.triangle;
    if (min + mid <= max)
        throw "Not a valid triangle";
}

Triangle.prototype.kind = function() {
    var [a, b, c] = this.triangle;
    
    // Use strict equality for faster comparison
    if (a === c) return "equilateral";
    if (a === b || b === c) return "isosceles";
    return "scalene";
};

export default Triangle;