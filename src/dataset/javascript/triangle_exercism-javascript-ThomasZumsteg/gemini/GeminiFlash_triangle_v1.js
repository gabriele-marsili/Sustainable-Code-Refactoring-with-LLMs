/* Classifies triangles */
var Triangle = function(a, b, c) {
  if (a <= 0 || b <= 0 || c <= 0) {
    throw "Only positive length sides are allowed";
  }

  if (a + b <= c || a + c <= b || b + c <= a) {
    throw "Not a valid triangle";
  }
  
  this.a = a;
  this.b = b;
  this.c = c;
};

Triangle.prototype.kind = function() {
  const {a, b, c} = this;

  if (a === b && b === c) {
    return "equilateral";
  }

  if (a === b || a === c || b === c) {
    return "isosceles";
  }

  return "scalene";
};

export default Triangle;