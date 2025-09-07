def square_root(number):
    if number < 0:
        raise ValueError("Cannot compute square root of a negative number")
    if number == 0 or number == 1:
        return number
    root = number
    while True:
        new_root = 0.5 * (root + number / root)
        if abs(new_root - root) < 1e-10:
            break
        root = new_root
    return root