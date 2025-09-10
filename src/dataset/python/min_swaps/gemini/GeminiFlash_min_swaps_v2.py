def min_swaps(arr):
    n = len(arr)
    swaps = 0
    visited = [False] * n

    for i in range(n):
        if visited[i] or arr[i] == i + 1:
            continue

        cycle_size = 0
        j = i
        while not visited[j]:
            visited[j] = True
            j = arr[j] - 1
            cycle_size += 1

        if cycle_size > 0:
            swaps += (cycle_size - 1)

    return swaps