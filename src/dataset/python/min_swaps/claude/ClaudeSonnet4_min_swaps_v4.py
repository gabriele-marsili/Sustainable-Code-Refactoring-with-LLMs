def min_swaps(a):
    n = len(a)
    swaps = 0
    
    for i in range(n):
        while a[i] != i + 1:
            correct_pos = a[i] - 1
            a[correct_pos], a[i] = a[i], a[correct_pos]
            swaps += 1
    
    return swaps