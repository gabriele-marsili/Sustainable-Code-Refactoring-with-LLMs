def reverse_ascending_sublists(arr):
    if not arr:
        return []
    
    n = len(arr)
    start = 0
    
    for i in range(1, n):
        if arr[i] <= arr[i - 1]:
            if start < i - 1:
                left, right = start, i - 1
                while left < right:
                    arr[left], arr[right] = arr[right], arr[left]
                    left += 1
                    right -= 1
            start = i
    
    if start < n - 1:
        left, right = start, n - 1
        while left < right:
            arr[left], arr[right] = arr[right], arr[left]
            left += 1
            right -= 1
    
    return arr

def reverse_arr(arr, start, end):
    while start < end:
        arr[start], arr[end] = arr[end], arr[start]
        start += 1
        end -= 1
    return arr