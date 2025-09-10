def missing_number(nums):
    return (len(nums) + 1) * (len(nums) + 2) // 2 - sum(nums)