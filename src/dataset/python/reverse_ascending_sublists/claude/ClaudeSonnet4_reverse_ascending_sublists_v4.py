def reverse_ascending_sublists(arr):
    if not arr:
        return []
    
    n = len(arr)
    result = arr[:]
    start = 0
    
    for i in range(1, n):
        if result[i] <= result[i - 1]:
            if i - 1 > start:
                left, right = start, i - 1
                while left < right:
                    result[left], result[right] = result[right], result[left]
                    left += 1
                    right -= 1
            start = i
    
    if n - 1 > start:
        left, right = start, n - 1
        while left < right:
            result[left], result[right] = result[right], result[left]
            left += 1
            right -= 1
    
    return result

def reverse_arr(arr, start, end):
    while start < end:
        arr[start], arr[end] = arr[end], arr[start]
        start += 1
        end -= 1
    return arr