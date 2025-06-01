def equilateral(sides):
    # triangle by definition 
    # all sides of same lengths amongst themselves
    return all([s == sides[i-1] for i, s in enumerate(sides)]) and triangle(sides)

def isosceles(sides):
    # triangle by definition 
    # any two sides are equal in length 
    return any([s == sides[i-1] for i, s in enumerate(sides)]) and triangle(sides)

def scalene(sides):
    # triangle by definition 
    # all sides of different lengths amongst each other 
    return all([s != sides[i-1] for i, s in enumerate(sides)]) and triangle(sides)

def triangle(sides):
    zero = all([s > 0 for s in sides]) # all sides are of non-zero positive length 
    # longuest side is not longer than half the sum of lengths (the perimeter)
    smaller_than_half = (max(sides) <= sum(sides) / 2)
    return (zero and smaller_than_half)
