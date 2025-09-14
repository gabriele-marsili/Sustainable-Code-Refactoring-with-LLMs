def find_first_missing_1(a):
    n = len(a)
    
    i = 0
    while i < n:
        target_pos = a[i] - 1
        if 0 <= target_pos < n and a[i] != a[target_pos]:
            a[i], a[target_pos] = a[target_pos], a[i]
        else:
            i += 1
    
    for i in range(n):
        if a[i] != i + 1:
            return i + 1
    
    return n + 1


def find_first_missing_2(a):
    n = len(a)
    
    for i in range(n):
        if a[i] <= 0:
            a[i] = n + 1
    
    for i in range(n):
        idx = abs(a[i]) - 1
        if idx < n and a[idx] > 0:
            a[idx] = -a[idx]
    
    for i in range(n):
        if a[i] > 0:
            return i + 1
    
    return n + 1