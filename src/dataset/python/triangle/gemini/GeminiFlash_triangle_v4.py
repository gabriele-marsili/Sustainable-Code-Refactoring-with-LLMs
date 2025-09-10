def equilateral(sides):
    if len(sides) != 3 or any(s <= 0 for s in sides):
        return False
    a, b, c = sides
    return a == b == c

def isosceles(sides):
    if len(sides) != 3 or any(s <= 0 for s in sides):
        return False
    a, b, c = sides
    return (a == b) or (a == c) or (b == c)

def scalene(sides):
    if len(sides) != 3 or any(s <= 0 for s in sides):
        return False
    a, b, c = sides
    return (a != b) and (a != c) and (b != c)

def triangle(sides):
    if len(sides) != 3:
        return False
    a, b, c = sides
    if any(s <= 0 for s in sides):
        return False
    return a + b > c and a + c > b and b + c > a