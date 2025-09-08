def sort_rgb_array(arr):
    if not arr:
        return arr
    
    n = len(arr)
    r = g = 0
    
    for i in range(n):
        if arr[i] == 'R':
            arr[i], arr[r] = arr[r], arr[i]
            if r < g:
                arr[i], arr[g] = arr[g], arr[i]
            r += 1
            g += 1
        elif arr[i] == 'G':
            arr[i], arr[g] = arr[g], arr[i]
            g += 1
    
    return arr

def swap(arr, i, j):
    arr[i], arr[j] = arr[j], arr[i]

def sort_rgb_array_2(arr):
    if not arr:
        return arr
    
    r_count = g_count = 0
    
    for c in arr:
        if c == 'R':
            r_count += 1
        elif c == 'G':
            g_count += 1
    
    g_end = r_count + g_count
    
    for i in range(len(arr)):
        if i < r_count:
            arr[i] = 'R'
        elif i < g_end:
            arr[i] = 'G'
        else:
            arr[i] = 'B'
    
    return arr