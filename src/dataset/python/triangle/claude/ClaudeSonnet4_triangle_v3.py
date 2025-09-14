def equilateral(sides):
    if not triangle(sides):
        return False
    first_side = sides[0]
    return all(s == first_side for s in sides[1:])

def isosceles(sides):
    if not triangle(sides):
        return False
    return len(set(sides)) <= 2

def scalene(sides):
    if not triangle(sides):
        return False
    return len(set(sides)) == 3

def triangle(sides):
    if not all(s > 0 for s in sides):
        return False
    total = sum(sides)
    return max(sides) < total - max(sides)