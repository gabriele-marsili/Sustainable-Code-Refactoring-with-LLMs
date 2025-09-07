def prime_factors(n):
    factors = []

    # Handle factor of 2
    while n % 2 == 0:
        factors.append(2)
        n //= 2

    # Check odd factors up to √n
    for i in range(3, int(n**0.5) + 1, 2):
        while n % i == 0:
            factors.append(i)
            n //= i

    # If n is a prime number greater than 2
    if n > 1:
        factors.append(n)

    return factors