def square_root(number):
    if number < 0:
        raise ValueError("Cannot compute square root of a negative number")
    if number == 0 or number == 1:
        return number
    root = number
    while True:
        new_root = 0.5 * (root + number / root)
        if abs(new_root - root) < 1e-10:
            return int(new_root) if int(new_root) ** 2 == number else new_root
        root = new_root