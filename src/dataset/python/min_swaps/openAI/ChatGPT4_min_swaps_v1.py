def min_swaps(a):
    swaps = 0
    i = 0
    while i < len(a):
        correct_pos = a[i] - 1
        if a[i] != a[correct_pos]:
            a[i], a[correct_pos] = a[correct_pos], a[i]
            swaps += 1
        else:
            i += 1
    return swaps