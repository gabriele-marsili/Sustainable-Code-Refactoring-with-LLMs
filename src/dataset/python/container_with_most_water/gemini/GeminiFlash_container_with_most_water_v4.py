def max_area(height):
    l = 0
    r = len(height) - 1
    max_area_val = 0
    while l < r:
        area = min(height[l], height[r]) * (r - l)
        max_area_val = max(max_area_val, area)
        if height[l] < height[r]:
            l += 1
        else:
            r -= 1
    return max_area_val