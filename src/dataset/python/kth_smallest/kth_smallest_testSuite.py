# Test 1
# Correct result => 1 1 1 1 1 1
arr = [1, 1, 1, 1, 1, 1]
print([find_kth_smallest_recursive(arr, i) for i in range(1, len(arr) + 1)])
print([find_kth_smallest(arr, i) for i in range(1, len(arr) + 1)])

# Test 2
# Correct result => 0 1 2 4 4 4 6 8 8 10 11 12
arr = [6, 4, 2, 12, 4, 8, 10, 1, 11, 0, 8, 4]
print([find_kth_smallest_recursive(arr, i) for i in range(1, len(arr) + 1)])
print([find_kth_smallest(arr, i) for i in range(1, len(arr) + 1)])

# Test 3
# Correct result => 1 2 3 4 5
arr = [5, 4, 3, 2, 1]
print([find_kth_smallest_recursive(arr, i) for i in range(1, len(arr) + 1)])
print([find_kth_smallest(arr, i) for i in range(1, len(arr) + 1)])