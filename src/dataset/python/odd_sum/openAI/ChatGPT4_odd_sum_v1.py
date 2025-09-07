def odd_sum(a, b):
    # Adjust a to the first odd number and b to the last odd number
    if a % 2 == 0:
        a += 1
    if b % 2 == 0:
        b -= 1
    # Calculate the count of odd numbers
    n = (b - a) // 2 + 1
    # Use the formula for the sum of an arithmetic series
    return n * (a + b) // 2