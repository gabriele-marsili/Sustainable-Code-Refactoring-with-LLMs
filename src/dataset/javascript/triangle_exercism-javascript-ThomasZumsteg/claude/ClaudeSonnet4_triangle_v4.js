var Triangle = function(a, b, c) {
    if (a < 0 || b < 0 || c < 0) 
        throw "Only positive length sides are allowed";
    if (a === 0 || b === 0 || c === 0)
        throw "Triangle cannot have zero area";
    
    this.a = Math.min(a, b, c);
    this.c = Math.max(a, b, c);
    this.b = a + b + c - this.a - this.c;
    
    if (this.a + this.b <= this.c)
        throw "Not a valid triangle";
};

Triangle.prototype.kind = function() {
    if (this.a === this.c)
        return "equilateral";
    if (this.a === this.b || this.b === this.c)
        return "isosceles";
    return "scalene";
};

export default Triangle;