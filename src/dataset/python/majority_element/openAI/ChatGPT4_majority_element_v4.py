def majority_element_1(nums):
    return sorted(nums)[len(nums) // 2]

def majority_element_2(nums):
    from collections import Counter
    return max(Counter(nums).items(), key=lambda x: x[1])[0]

def majority_element_3(nums):
    majority, count = None, 0
    for num in nums:
        count += (1 if num == majority else -1) if count else (majority := num, 1)[1]
    return majority