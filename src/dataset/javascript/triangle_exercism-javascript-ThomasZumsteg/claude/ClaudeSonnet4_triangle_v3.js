var Triangle = function(a, b, c) {
    if (a < 0 || b < 0 || c < 0) 
        throw "Only positive length sides are allowed";
    if (a === 0 || b === 0 || c === 0)
        throw "Triangle cannot have zero area";
    
    this.triangle = a <= b && a <= c ? 
        (b <= c ? [a, b, c] : [a, c, b]) :
        b <= c && b <= a ? 
        (a <= c ? [b, a, c] : [b, c, a]) :
        (a <= b ? [c, a, b] : [c, b, a]);
    
    if (this.triangle[0] + this.triangle[1] <= this.triangle[2])
        throw "Not a valid triangle";
};

Triangle.prototype.kind = function() {
    var a = this.triangle[0];
    var b = this.triangle[1];
    var c = this.triangle[2];
    
    if (a === b) {
        return b === c ? "equilateral" : "isosceles";
    }
    return b === c ? "isosceles" : "scalene";
};

export default Triangle;