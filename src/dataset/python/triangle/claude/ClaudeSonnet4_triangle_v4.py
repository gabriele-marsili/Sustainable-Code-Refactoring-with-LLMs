def equilateral(sides):
    if not triangle(sides):
        return False
    first = sides[0]
    return sides[1] == first and sides[2] == first

def isosceles(sides):
    if not triangle(sides):
        return False
    return sides[0] == sides[1] or sides[1] == sides[2] or sides[0] == sides[2]

def scalene(sides):
    if not triangle(sides):
        return False
    return sides[0] != sides[1] and sides[1] != sides[2] and sides[0] != sides[2]

def triangle(sides):
    if not all(s > 0 for s in sides):
        return False
    total = sum(sides)
    return max(sides) < total / 2