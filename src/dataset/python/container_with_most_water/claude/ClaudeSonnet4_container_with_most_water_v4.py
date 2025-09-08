def max_area(height):
    l = 0
    r = len(height) - 1
    max_height = 0
    
    while l < r:
        left_val = height[l]
        right_val = height[r]
        
        if left_val < right_val:
            area = left_val * (r - l)
            max_height = max(max_height, area)
            l += 1
            while l < r and height[l] <= left_val:
                l += 1
        else:
            area = right_val * (r - l)
            max_height = max(max_height, area)
            r -= 1
            while l < r and height[r] <= right_val:
                r -= 1
    
    return max_height