def find_kth_smallest_recursive(arr, k):
    if not 1 <= k <= len(arr):
        return None
    return kth_smallest(arr, k - 1, 0, len(arr) - 1)

def kth_smallest(arr, k, left, right):
    while left <= right:
        pivot = pivoting(arr, left, right)
        if pivot == k:
            return arr[pivot]
        elif pivot > k:
            right = pivot - 1
        else:
            left = pivot + 1

def pivoting(arr, left, right):
    pivot_value = arr[right]
    new_pivot = left
    for j in range(left, right):
        if arr[j] < pivot_value:
            if new_pivot != j:
                arr[new_pivot], arr[j] = arr[j], arr[new_pivot]
            new_pivot += 1
    if new_pivot != right:
        arr[new_pivot], arr[right] = arr[right], arr[new_pivot]
    return new_pivot

def find_kth_smallest(arr, k):
    if not 1 <= k <= len(arr):
        return None

    k -= 1
    left, right = 0, len(arr) - 1

    while left <= right:
        pivot = pivoting(arr, left, right)
        if pivot == k:
            return arr[pivot]
        elif pivot > k:
            right = pivot - 1
        else:
            left = pivot + 1