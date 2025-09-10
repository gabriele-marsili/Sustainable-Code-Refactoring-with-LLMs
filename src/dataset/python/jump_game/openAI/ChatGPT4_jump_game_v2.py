def can_jump(nums):
    max_jump = 0
    for i, num in enumerate(nums):
        if max_jump < i:
            return False
        max_jump = max(max_jump, i + num)
        if max_jump >= len(nums) - 1:
            return True
    return False