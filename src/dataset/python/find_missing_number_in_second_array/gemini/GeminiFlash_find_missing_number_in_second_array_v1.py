'''
Find missing number in second array

Given 2 arrays, first array with N elements and second array with N-1 elements.
All elements from the first array exist in the second array, except one. Find the missing number.

Sample input:   [1, 2, 3, 4, 5], [1, 2, 3, 4]
Sample output:  5

Sample input:   [2131, 2122221, 64565, 33333333, 994188129, 865342234],
                [994188129, 2122221, 865342234, 2131, 64565]
Sample output:  33333333

=========================================
The simplest solution is to substract the sum of the second array from the sum of the first array:
missing_number = sum(arr1) - sum(arr2)
But what if we have milions of elements and all elements are with 8-9 digits values?
In this case we'll need to use modulo operation. Make two sums, the first one from MODULO of each element
and the second one from the DIVIDE of each element. In the end use these 2 sums to compute the missing number.
    Time Complexity:    O(N)
    Space Complexity:   O(1)
The second solution is XOR soulution, make XOR to each element from the both arrays (same as find_unpaired.py).
    Time Complexity:    O(N)
    Space Complexity:   O(1)
'''


##############
# Solution 1 #
##############

def find_missing_number(arr1, arr2):
    sum_arr1 = sum(arr1)
    sum_arr2 = sum(arr2)
    return sum_arr1 - sum_arr2


##############
# Solution 2 #
##############

def find_missing_number_2(arr1, arr2):
    missing = 0
    for num in arr1:
        missing ^= num
    for num in arr2:
        missing ^= num
    return missing