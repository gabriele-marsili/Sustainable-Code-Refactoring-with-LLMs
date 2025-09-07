def square_root(number):
    if number < 0:
        raise ValueError("Cannot calculate square root of a negative number")
    if number == 0:
        return 0.0
    
    root = number
    while abs(root * root - number) > 1e-6:
        root = (root + number / root) / 2
    return root