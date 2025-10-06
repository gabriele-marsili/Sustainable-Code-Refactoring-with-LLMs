def prime_factors(n):
    factors = []
    
    # Handle factor 2
    while n & 1 == 0:
        factors.append(2)
        n >>= 1
    
    # Handle odd factors
    i = 3
    sqrt_n = int(n ** 0.5) + 1
    while i < sqrt_n:
        while n % i == 0:
            factors.append(i)
            n //= i
            sqrt_n = int(n ** 0.5) + 1
        i += 2
    
    # If n is still > 1, it's a prime factor
    if n > 1:
        factors.append(n)
    
    return factors