def equilateral(sides):
    return sides[0] == sides[1] == sides[2] and triangle(sides)

def isosceles(sides):
    return (sides[0] == sides[1] or sides[1] == sides[2] or sides[0] == sides[2]) and triangle(sides)

def scalene(sides):
    return sides[0] != sides[1] != sides[2] != sides[0] and triangle(sides)

def triangle(sides):
    return all(s > 0 for s in sides) and max(sides) <= sum(sides) - max(sides)