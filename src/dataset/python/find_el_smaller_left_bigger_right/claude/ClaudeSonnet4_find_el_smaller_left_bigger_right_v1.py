def find_element_smaller_left_bigger_right(arr):
    n = len(arr)
    if n < 3:
        return -1
    
    curr_max = arr[0]
    result = -1
    
    for i in range(1, n - 1):
        curr_el = arr[i]
        if curr_el >= curr_max:
            if result == -1:
                result = curr_el
        elif curr_el < result:
            result = -1
        
        if curr_el > curr_max:
            curr_max = curr_el
    
    return result