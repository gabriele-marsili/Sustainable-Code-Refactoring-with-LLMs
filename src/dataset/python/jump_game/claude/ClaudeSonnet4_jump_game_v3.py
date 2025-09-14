def can_jump(nums):
    n = len(nums)
    if n <= 1:
        return True
    
    max_reach = nums[0]
    for i in range(1, n):
        if i > max_reach:
            return False
        max_reach = max(max_reach, i + nums[i])
        if max_reach >= n - 1:
            return True
    
    return False