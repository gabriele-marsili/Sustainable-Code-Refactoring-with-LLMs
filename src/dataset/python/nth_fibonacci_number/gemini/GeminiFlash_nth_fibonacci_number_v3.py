'''
Find Nth Fibonacci Number

The Fibonacci numbers are the numbers in the following integer sequence.
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144...
Given a number n, print n-th Fibonacci Number.

Input: 8
Output: 34

=========================================
Many solutions for this problem exist, I'll show 7 different solutions,
starting from the worst, O(2^N) time complexity, and finishg with the best, O(LogN) time complexity.

The simplest recursive solution. Direct recursive implementation of this
mathematical recurrence relation T(N) = T(N-1) + T(N-2).
Everyone knows this, this is the introductory lesson in recursion.
    Time Complexity:    O(2^N)  , actually ~1.6^N, the golden ratio number
    Space Complexity:   O(N)    , because of the recursion stack

Recursion with memoization, much faster, less computations.
For many numbers the recursive function is called more than once (in total ~1.6^N - N times duplicate calls).
Use hashmap/dictionary to save all computed numbers as values and the positions as keys.
    Time Complexity:    O(N)
    Space Complexity:   O(N)

Dynamic programming. Implementation of T(N) = T(N-1) + T(N-2) using a loop and dp table/array.
    Time Complexity:    O(N)
    Space Complexity:   O(N)

Space optimized dynamic programming. You can easily notice that you don't need the whole array,
you need only the last 2 values T(N-1) and T(N-2), and after you compute T(N) you won't need T(N-2) anymore, etc.
    Time Complexity:    O(N)
    Space Complexity:   O(1)

Using power of the matrix [[1, 1], [1, 0]]. The 3 next solutions are based on this logic.
Explanation:
start matrix:   | 1  1 |
                | 1  0 |

result matrix:  | Fn+1  Fn   |
                | Fn    Fn-1 |

result * start =    | Fn+1 * 1 + Fn * 1    Fn+1 * 1 + Fn * 0 |
                    | Fn * 1 + Fn-1 * 1    Fn * 1 + Fn-1 * 0 |

               =    | Fn+1 + Fn    Fn+1 |
                    | Fn + Fn-1    Fn   |

               =    | Fn+2    Fn+1 |
                    | Fn+1    Fn   |
According to this, when you're multiplying with this matrix you're getting the next fibonacci number.
    Time Complexity:    O(N)
    Space Complexity:   O(1)

Time optimized matrix power. Using a recursive divide and conquer approach.
From the basic math we know that A^K * A^K = A^2K, the same rule we can use in matrix multiplication.
    Time Complexity:    O(LogN)
    Space Complexity:   O(LogN)     , because of the recursion stack

Time and space optimized matrix multiplication.
Using a loop (without a recursion) compute the power of N of the matrix.
    Time Complexity:    O(LogN)
    Space Complexity:   O(1)

Using the golden ratio (Binet's formula) = (1+sqrt(5))/2 ~ 1.6183...
More info about this solution: https://demonstrations.wolfram.com/GeneralizedFibonacciSequenceAndTheGoldenRatio/
    Time Complexity:    O(1)
    Space Complexity:   O(1)
'''


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

fib = {}

def nth_fibonacci_2(n):
    if n in fib:
        return fib[n]
    if n <= 1:
        fib[n] = n
        return n
    fib[n] = nth_fibonacci_2(n - 1) + nth_fibonacci_2(n - 2)
    return fib[n]


##############
# Solution 3 #
##############

def nth_fibonacci_3(n):
    if n <= 1:
        return n
    dp = [0, 1] + [0] * (n - 1)
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]


##############
# Solution 4 #
##############

def nth_fibonacci_4(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a


#################################
# Helper for the next solutions #
#################################

def matrix_mult(a, b):
    a00, a01, a10, a11 = a[0][0], a[0][1], a[1][0], a[1][1]
    b00, b01, b10, b11 = b[0][0], b[0][1], b[1][0], b[1][1]
    a[0][0] = a00 * b00 + a01 * b10
    a[0][1] = a00 * b01 + a01 * b11
    a[1][0] = a10 * b00 + a11 * b10
    a[1][1] = a10 * b01 + a11 * b11


##############
# Solution 5 #
##############

def nth_fibonacci_5(n):
    fib = [[1, 1], [1, 0]]
    res = [[1, 0], [0, 1]]

    while n > 0:
        if n % 2 == 1:
            matrix_mult(res, fib)
        matrix_mult(fib, fib)
        n //= 2

    return res[0][1]


##############
# Solution 6 #
##############

def nth_fibonacci_6(n):
    res = [[1, 1], [1, 0]]
    matrix_pow(res, n)
    return res[0][1]


def matrix_pow(mat, n):
    if n <= 1:
        return
    matrix_pow(mat, n // 2)
    matrix_mult(mat, mat)
    if n % 2 == 1:
        matrix_mult(mat, [[1, 1], [1, 0]])


##############
# Solution 7 #
##############

def nth_fibonacci_7(n):
    fib = [[1, 1], [1, 0]]
    res = [[1, 0], [0, 1]]

    while n > 0:
        if n % 2 == 1:
            matrix_mult(res, fib)
        matrix_mult(fib, fib)
        n //= 2

    return res[0][1]


##############
# Solution 8 #
##############

import math

def nth_fibonacci_8(n):
    sqrt5 = math.sqrt(5)
    phi = (1 + sqrt5) / 2
    return round(phi**n / sqrt5)