def equilateral(sides):
    a, b, c = sides
    return a == b == c and a > 0

def isosceles(sides):
    a, b, c = sides
    return (a == b or a == c or b == c) and (a + b > c) and (a + c > b) and (b + c > a) and a > 0

def scalene(sides):
    a, b, c = sides
    return a != b and a != c and b != c and (a + b > c) and (a + c > b) and (b + c > a) and a > 0 and b > 0 and c > 0

def triangle(sides):
    a, b, c = sides
    return a > 0 and b > 0 and c > 0 and (a + b > c) and (a + c > b) and (b + c > a)