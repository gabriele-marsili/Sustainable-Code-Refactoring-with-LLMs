import math
def is_armstrong_number(number):
 
    digits = [i for i in str(number)]
    sum_digits = sum(math.pow(int(e), len(digits)) for e in digits)
    return sum_digits == number

    # simply do len(digits) doesn't recompute the value so better SOLVED
    """
    Redundancy: simply do str(number) to obtain a list. You call str(number) multiple times
    instead of once. This looks like:
        digits = [i for i in str(number)]
    SOLVED
    """
    """
    Optimal but in python, list comprehensions are usually faster when possible. This looks like
    the single call:
        sum_digits = sum(math.pow(int(e), len(digits)) for e in digits)
    SOLVED
    """
