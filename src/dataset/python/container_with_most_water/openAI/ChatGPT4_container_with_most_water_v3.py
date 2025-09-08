def max_area(height):
    l, r = 0, len(height) - 1
    max_height = 0
    while l < r:
        if height[l] < height[r]:
            max_height = max(max_height, height[l] * (r - l))
            l += 1
        else:
            max_height = max(max_height, height[r] * (r - l))
            r -= 1
    return max_height