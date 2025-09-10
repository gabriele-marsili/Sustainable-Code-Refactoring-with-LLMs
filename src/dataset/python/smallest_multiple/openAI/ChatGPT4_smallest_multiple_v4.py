from math import gcd
from functools import reduce

def smallest_multiple(start, end):
    return reduce(lcm, range(start, end + 1), 1)

def lcm(a, b):
    return a * b // gcd(a, b)