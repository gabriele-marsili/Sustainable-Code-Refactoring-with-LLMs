##############
# Solution 1 #
##############

def majority_element_1(nums):
    return sorted(nums)[len(nums) // 2]


##############
# Solution 2 #
##############

def majority_element_2(nums):
    from collections import Counter
    counter = Counter(nums)
    return max(counter, key=counter.get)


##############
# Solution 3 #
##############

def majority_element_3(nums):
    majority, count = None, 0

    for num in nums:
        count += (1 if num == majority else -1) if count else 1
        majority = majority if count else num

    return majority