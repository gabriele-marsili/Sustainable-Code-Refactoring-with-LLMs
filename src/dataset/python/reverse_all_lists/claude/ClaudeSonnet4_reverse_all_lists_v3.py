from collections import deque

def reverse_all_lists(arr):
    if not arr:
        return arr
    
    queue = deque([arr])
    
    while queue:
        inner_arr = queue.popleft()
        
        left, right = 0, len(inner_arr) - 1
        while left < right:
            inner_arr[left], inner_arr[right] = inner_arr[right], inner_arr[left]
            left += 1
            right -= 1
        
        for item in inner_arr:
            if isinstance(item, list):
                queue.append(item)
    
    return arr

def reverse_arr(arr):
    if not arr:
        return arr
    
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
    
    return arr