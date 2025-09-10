##############
# Solution 1 #
##############

def nth_fibonacci_1(n):
    if n <= 1:
        return n
    return nth_fibonacci_1(n - 1) + nth_fibonacci_1(n - 2)


##############
# Solution 2 #
##############

fib_cache = {0: 0, 1: 1}

def nth_fibonacci_2(n):
    if n not in fib_cache:
        fib_cache[n] = nth_fibonacci_2(n - 1) + nth_fibonacci_2(n - 2)
    return fib_cache[n]


##############
# Solution 3 #
##############

def nth_fibonacci_3(n):
    if n <= 1:
        return n
    dp0, dp1 = 0, 1
    for _ in range(2, n + 1):
        dp0, dp1 = dp1, dp0 + dp1
    return dp1


##############
# Solution 4 #
##############

def nth_fibonacci_4(n):
    dp0, dp1 = 0, 1
    for _ in range(n):
        dp0, dp1 = dp1, dp0 + dp1
    return dp0


#################################
# Helper for the next solutions #
#################################

def matrix_mult(a, b):
    a00, a01 = a[0]
    a10, a11 = a[1]
    b00, b01 = b[0]
    b10, b11 = b[1]
    a[0][0], a[0][1] = a00 * b00 + a01 * b10, a00 * b01 + a01 * b11
    a[1][0], a[1][1] = a10 * b00 + a11 * b10, a10 * b01 + a11 * b11


##############
# Solution 5 #
##############

def nth_fibonacci_5(n):
    if n <= 1:
        return n
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
    if n <= 1:
        return n
    res = [[1, 0], [0, 1]]  # Identity matrix
    fib = [[1, 1], [1, 0]]
    matrix_pow(fib, n)
    return fib[0][1]

def matrix_pow(mat, n):
    res = [[1, 0], [0, 1]]  # Identity matrix
    while n > 0:
        if n % 2 == 1:
            matrix_mult(res, mat)
        n //= 2
        matrix_mult(mat, mat)
    mat[0][0], mat[0][1], mat[1][0], mat[1][1] = res[0][0], res[0][1], res[1][0], res[1][1]


##############
# Solution 7 #
##############

def nth_fibonacci_7(n):
    if n <= 1:
        return n
    fib = [[1, 1], [1, 0]]
    res = [[1, 0], [0, 1]]  # Identity matrix
    while n > 0:
        if n % 2 == 1:
            matrix_mult(res, fib)
        n //= 2
        matrix_mult(fib, fib)
    return res[0][1]


##############
# Solution 8 #
##############

import math

def nth_fibonacci_8(n):
    if n <= 1:
        return n
    sqrt_5 = math.sqrt(5)
    phi = (1 + sqrt_5) / 2
    return round(phi**n / sqrt_5)