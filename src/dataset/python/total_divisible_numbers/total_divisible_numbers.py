'''
Total Divisible Numbers

Given an array A of N numbers,
your task is to find how many numbers from 1 to S are divisible by all of the elements in the array.

Input: [2, 4, 5], 45
Output: 2
Output explanation: 20 and 40 are divisible by all numbers in the array.

=========================================
Find least common multiple of all numbers in the array (lcm can be found using gcd, (a * b)/gcd(a, b)).
And in the end check how many numbers are divisble by the lcm number (smaller or equal to S).
    Time Complexity:    O(N)
    Space Complexity:   O(1)
'''


############
# Solution #
############

def total_divisible_numbers(arr, S):
    # find lcm for all numbers in the array
    lcm = 1
    for a in arr:
        lcm = (a * lcm) // gcd(a, lcm)

    # return the count of numbers divisble by the lcm number (smaller or equal to S)
    return S // lcm

def gcd(a, b):
    while a != 0:
        a, b = b % a, a # "Pythonic way"
        # or temp = a; a = b % a; b = temp; in the other languages
    return b