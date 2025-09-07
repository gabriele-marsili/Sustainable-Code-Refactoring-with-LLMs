'''
Prime Factors of Integers

As the fundamental theorem of arithmetic again reminds us, every positive integer can be broken
down into the product of its prime factors exactly one way, disregarding the order of listing these
factors. Given positive integer n > 1, return the list of its prime factors in sorted ascending order,
each prime factor included in the list as many times as it appears in the prime factorization of n.

Input: 42
Output: [2, 3, 7]

=========================================
While n is divisible by 2, save all 2 factors and divide n by 2.
Now n is odd, so you won't need to check if divisible by some even number, because of that starting from 3
jump by 2 numbers.
    Time Complexity:    O(N)    , if prime number then N/2 checks, if all prime factors are 2 then LogN checks
    Space Complexity:   O(LogN) , if all prime factors are 2, else less than LogN space
'''


############
# Solution #
############

def prime_factors(n):
    factors = []

    # Handle factor 2
    if n & 1 == 0:
        while n & 1 == 0:
            factors.append(2)
            n >>= 1

    # Handle odd factors
    i = 3
    sqrt_n = int(n ** 0.5) + 1
    while i < sqrt_n and n > 1:
        while n % i == 0:
            factors.append(i)
            n //= i
        i += 2
        if i * i > n:
            break

    if n > 1:
        factors.append(n)

    return factors