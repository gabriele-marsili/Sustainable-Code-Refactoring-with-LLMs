'''
Product of Array Except Self

Given an array nums of n integers where n > 1,
return an array output such that output[i] is equal to the product of all the elements of nums except nums[i].
Note: Please solve it without division and in O(n).
Follow up:
Could you solve it with constant space complexity?
(The output array does not count as extra space for the purpose of space complexity analysis.)

Input: [1, 2, 3, 4]
Output: [24, 12, 8, 6]

=========================================
2 iterations, one from front and the second from back.
Make the products as this: from 0 to i-1 and from i-1 to N-1, and in the end only multiply these 2 products.
    Time Complexity:    O(N)
    Space Complexity:   O(N)    , According to the desciption O(1), the result array is not couted as extra space.
'''


############
# Solution #
############

def product_except_self(nums):
    n = len(nums)
    if n == 0:
        return []

    res = [1] * n
    prefix = 1
    for i in range(n):
        res[i] = prefix
        prefix *= nums[i]

    postfix = 1
    for i in range(n - 1, -1, -1):
        res[i] *= postfix
        postfix *= nums[i]

    return res