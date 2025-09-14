'''
Smallest multiple

2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.
What is the smallest positive number that is evenly divisible by all of the numbers from A to B?

=========================================
The solution is the least common multiple for more than 2 numbers (in this case all numbers from "start" to "end")
    Time Complexity:    O(N)    , N = start - end, GCD complexity is O(Log min(a, b))
    Space Complexity:   O(1)
'''


############
# Solution #
############

def smallest_multiple(start, end):
    result = start
    
    for k in range(start + 1, end + 1):
        result = result * k // gcd(result, k)
    
    return result

# Greatest common divisor (euclidian algorithm, fast algorithm)
def gcd(a, b):
    while b:
        a, b = b, a % b
    return a