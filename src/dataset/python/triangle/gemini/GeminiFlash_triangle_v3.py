def equilateral(sides):
    a, b, c = sides
    return a == b == c and triangle(sides)

def isosceles(sides):
    a, b, c = sides
    return (a == b or a == c or b == c) and triangle(sides)

def scalene(sides):
    a, b, c = sides
    return a != b and a != c and b != c and triangle(sides)

def triangle(sides):
    a, b, c = sides
    if not all(s > 0 for s in sides):
        return False
    return a + b >= c and a + c >= b and b + c >= a