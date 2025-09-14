def get_minimum_X(arr, k):
    n = len(arr)
    if n == 0 or k > n:
        return -1
    if k == n:
        return 1
    if k == 0:
        return max(arr) + 1
    
    # Use quickselect-like approach to find the (n-k)th and (n-k-1)th largest elements
    # without fully sorting the array
    import heapq
    
    # For small k, use heap to find k largest elements
    if k <= n // 2:
        k_largest = heapq.nlargest(k + 1, arr)
        if k_largest[k] == k_largest[k - 1]:
            return -1
        return k_largest[k] + 1
    else:
        # For large k, find n-k smallest elements
        remaining = n - k
        remaining_smallest = heapq.nsmallest(remaining + 1, arr)
        if remaining_smallest[-1] == remaining_smallest[-2]:
            return -1
        return remaining_smallest[-2] + 1