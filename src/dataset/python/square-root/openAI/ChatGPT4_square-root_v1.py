def square_root(number):
    if number < 0:
        raise ValueError("Cannot compute square root of a negative number")
    if number == 0 or number == 1:
        return number

    root = number
    epsilon = 1e-9  # Precision threshold for floating-point comparison
    while abs(root * root - number) > epsilon:
        root = 0.5 * (root + number / root)  # Newton-Raphson method
    return root