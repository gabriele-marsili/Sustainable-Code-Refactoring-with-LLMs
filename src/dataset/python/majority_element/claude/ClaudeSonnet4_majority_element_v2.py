'''
Majority Element

Given an array of size n, find the majority element.
The majority element is the element that appears more than ⌊ n/2 ⌋ times.
You may assume that the array is non-empty and the majority element always exist in the array.

Input: [3, 2, 3]
Output: 3

Input: [2, 2, 1, 1, 1, 2, 2]
Output: 2

=========================================
Sort the array and the result will the middle element.
    Time Complexity:    O(N LogN)
    Space Complexity:   O(1)
Use dictionary (hash map) and count the occurrences.
The result will be the one with more than ⌊ n/2 ⌋ occurrences.
    Time Complexity:    O(N)
    Space Complexity:   O(N)
Using Boyer-Moore voting algorithm. Choose a potential majority element and for each occurence add +1, but
if the current element isn't same substract -1.
When the counter is 0, the next element becomes the new potential majority element.
    Time Complexity:    O(N)
    Space Complexity:   O(1)
'''


##############
# Solution 1 #
##############

def majority_element_1(nums):
    nums.sort()
    return nums[len(nums) >> 1]


##############
# Solution 2 #
##############

def majority_element_2(nums):
    from collections import Counter
    counter = Counter(nums)
    half = len(nums) >> 1
    
    for num, count in counter.items():
        if count > half:
            return num


##############
# Solution 3 #
##############

def majority_element_3(nums):
    majority = nums[0]
    count = 1

    for i in range(1, len(nums)):
        if count == 0:
            majority = nums[i]
            count = 1
        elif nums[i] == majority:
            count += 1
        else:
            count -= 1

    return majority