def max_area(height):
    l = 0
    r = len(height) - 1
    max_height = 0
    
    while l < r:
        left_height = height[l]
        right_height = height[r]
        width = r - l
        
        if left_height < right_height:
            current_area = left_height * width
            max_height = max(max_height, current_area)
            l += 1
        else:
            current_area = right_height * width
            max_height = max(max_height, current_area)
            r -= 1
    
    return max_height