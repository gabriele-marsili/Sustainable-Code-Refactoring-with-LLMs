def sum_non_adjacent(arr):
    if not arr:
        return 0

    prev2, prev1 = 0, max(arr[0], 0)

    for num in arr[1:]:
        current = max(prev1, prev2 + max(num, 0))
        prev2, prev1 = prev1, current

    return prev1