def odd_sum(a, b):
    # Adjust a to the first odd number in range
    if a % 2 == 0:
        a += 1
    # Adjust b to the last odd number in range
    if b % 2 == 0:
        b -= 1
    # Calculate count of odd numbers
    n = (b - a) // 2 + 1
    # Return the sum using the formula
    return n * (a + b) // 2