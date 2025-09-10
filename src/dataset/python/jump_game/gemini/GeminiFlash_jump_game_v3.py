def can_jump(nums):
    n = len(nums)
    reachable = 0
    for i in range(n):
        if i > reachable:
            return False
        reachable = max(reachable, i + nums[i])
        if reachable >= n - 1:
            return True
    return False