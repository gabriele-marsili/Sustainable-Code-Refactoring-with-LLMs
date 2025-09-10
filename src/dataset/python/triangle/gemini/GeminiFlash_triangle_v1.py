def triangle(sides):
    """
    Checks if the given sides can form a valid triangle.
    """
    a, b, c = sides
    if not all(s > 0 for s in sides):
        return False
    return a + b >= c and a + c >= b and b + c >= a

def equilateral(sides):
    """
    Checks if the triangle is equilateral (all sides are equal).
    """
    a, b, c = sides
    return a == b == c and triangle(sides)

def isosceles(sides):
    """
    Checks if the triangle is isosceles (at least two sides are equal).
    """
    a, b, c = sides
    return (a == b or a == c or b == c) and triangle(sides)

def scalene(sides):
    """
    Checks if the triangle is scalene (all sides are different).
    """
    a, b, c = sides
    return a != b and a != c and b != c and triangle(sides)