def steps(number):
    if number < 1:
        raise ValueError("Only positive integers are allowed")
    
    count = 0
    while number != 1:
        if number & 1:
            number = number * 3 + 1
        else:
            number >>= 1
        count += 1
    return count