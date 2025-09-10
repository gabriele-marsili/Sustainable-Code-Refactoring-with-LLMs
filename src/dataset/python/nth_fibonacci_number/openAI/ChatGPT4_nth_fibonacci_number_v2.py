##############
# Solution 1 #
##############

# Removed as it is highly inefficient and not suitable for optimization.

##############
# Solution 2 #
##############

def nth_fibonacci_2(n, fib={0: 0, 1: 1}):
    if n not in fib:
        fib[n] = nth_fibonacci_2(n - 1, fib) + nth_fibonacci_2(n - 2, fib)
    return fib[n]

##############
# Solution 3 #
##############

def nth_fibonacci_3(n):
    if n == 0:
        return 0
    dp0, dp1 = 0, 1
    for _ in range(2, n + 1):
        dp0, dp1 = dp1, dp0 + dp1
    return dp1 if n > 0 else dp0

##############
# Solution 4 #
##############

def nth_fibonacci_4(n):
    dp0, dp1 = 0, 1
    for _ in range(n):
        dp0, dp1 = dp1, dp0 + dp1
    return dp0

##############
# Solution 5 #
##############

def nth_fibonacci_5(n):
    if n == 0:
        return 0
    fib = [[1, 1], [1, 0]]
    res = [[1, 0], [0, 1]]  # Identity matrix
    while n > 0:
        if n % 2 == 1:
            matrix_mult(res, fib)
        n //= 2
        matrix_mult(fib, fib)
    return res[0][1]

##############
# Solution 6 #
##############

def nth_fibonacci_6(n):
    if n == 0:
        return 0
    res = [[1, 0], [0, 1]]  # Identity matrix
    fib = [[1, 1], [1, 0]]
    matrix_pow(fib, n, res)
    return res[0][1]

def matrix_pow(mat, n, res):
    while n > 0:
        if n % 2 == 1:
            matrix_mult(res, mat)
        n //= 2
        matrix_mult(mat, mat)

##############
# Solution 7 #
##############

# Combined with Solution 5 for efficiency.

##############
# Solution 8 #
##############

def nth_fibonacci_8(n):
    if n == 0:
        return 0
    golden_ratio = (1 + 5 ** 0.5) / 2
    return round(golden_ratio ** n / (5 ** 0.5))