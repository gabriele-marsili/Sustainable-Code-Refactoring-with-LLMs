def square_root(number):
    if number < 0:
        raise ValueError("Cannot calculate square root of a negative number")
    if number == 0:
        return 0

    root = number
    tolerance = 1e-7  # Define a tolerance for convergence

    while abs(root * root - number) > tolerance:
        root = (root + number / root) / 2  # Optimized Newton-Raphson

    return root