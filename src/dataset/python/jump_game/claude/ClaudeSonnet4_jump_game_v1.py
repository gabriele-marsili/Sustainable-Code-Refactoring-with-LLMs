def can_jump(nums):
    n = len(nums)
    if n <= 1:
        return True
    
    max_jump = nums[0]
    for i in range(1, n):
        if max_jump < i:
            return False
        if max_jump >= n - 1:
            return True
        max_jump = max(max_jump, i + nums[i])
    
    return max_jump >= n - 1