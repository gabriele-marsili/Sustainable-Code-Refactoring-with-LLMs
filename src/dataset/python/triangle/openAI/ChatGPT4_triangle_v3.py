def equilateral(sides):
    return sides[0] == sides[1] == sides[2] and triangle(sides)

def isosceles(sides):
    return len(set(sides)) <= 2 and triangle(sides)

def scalene(sides):
    return len(set(sides)) == 3 and triangle(sides)

def triangle(sides):
    return all(s > 0 for s in sides) and max(sides) * 2 <= sum(sides)