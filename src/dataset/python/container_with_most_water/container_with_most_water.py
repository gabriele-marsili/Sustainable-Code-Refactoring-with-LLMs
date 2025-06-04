def max_area(height):
    l = 0
    r = len(height) - 1
    max_height = 0
    while l < r:
        left = height[l]
        right = height[r]
        current_height = min(left, right) * (r - l)
        max_height = max(max_height, current_height)
        if left < right:
            while (l < r) and (left >= height[l]):
                l += 1
        else:
            while (l < r) and (right >= height[r]):
                r -= 1
    return max_height