def steps(number):
    if number < 1:
        raise ValueError("Only positive integers are allowed")
    i = 0
    while number != 1:
        if number & 1:  # odd check using bitwise AND
            number = number * 3 + 1
        else:  # even
            number >>= 1  # bit shift right (divide by 2)
        i += 1
    return i