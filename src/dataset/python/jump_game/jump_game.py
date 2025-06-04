def can_jump(nums):
    n = len(nums)
    if n == 0:
        return False
    max_jump = 0
    for i in range(n):
        if max_jump < i:
            return False
        this_jump = i + nums[i]
        max_jump = max(max_jump, this_jump)
        if max_jump >= n - 1:
            return True