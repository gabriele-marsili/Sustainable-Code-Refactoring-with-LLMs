def min_swaps(a):
    n = len(a)
    swaps = 0
    
    for i in range(n):
        target_pos = a[i] - 1
        if target_pos != i:
            a[target_pos], a[i] = a[i], a[target_pos]
            swaps += 1
            i -= 1
    
    return swaps