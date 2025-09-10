'''
Array rotation/shifting

Rotate array in right (or left) for K places.

Input: [1, 2, 3, 4, 5, 6], 1
Output: [6, 1, 2, 3, 4, 5]

Input: [1, 2, 3, 4, 5, 6], 3
Output: [4, 5, 6, 1, 2, 3]

=========================================
The first solution is a simple one, split the array in two parts and swap those parts.
    Time Complexity:    O(N)
    Space Complexity:   O(N)
For the second one we need to compute GCD, to decide how many different sets are there.
And after that shift all elements in that set for one position in right/left.
(elements in a set are not neighboring elements)
(A Juggling Algorithm, https://www.geeksforgeeks.org/array-rotation/)
    Time Complexity:    O(N)
    Space Complexity:   O(1)
'''


##############
# Solution 1 #
##############

def rotate_array_1(arr, k, right = True):
    n = len(arr)
    k %= n

    if not right:
        k = -k

    return arr[-k:] + arr[:-k]


##############
# Solution 2 #
##############

def rotate_array_2(arr, k, right = True):
    n = len(arr)
    k %= n

    if not right:
        k = n - k

    g = gcd(n, k)
    for i in range(g):
        temp = arr[i]
        j = i
        while True:
            d = (j + k) % n
            if d == i:
                break
            arr[j] = arr[d]
            j = d
        arr[j] = temp
    return arr


# greatest common divisor
def gcd(a, b):
    while(b):
        a, b = b, a % b
    return a