# Test 1
# Correct result => [4, 5, 6, 7, 8, 9, 10, 1, 2, 3]
arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
k = 7
print(rotate_array_1(arr, k))
print(rotate_array_2(arr, k))

# Test 2
# Correct result => [6, 1, 2, 3, 4, 5]
arr = [1, 2, 3, 4, 5, 6]
k = 1
print(rotate_array_1(arr, k))
print(rotate_array_2(arr, k))

# Test 3
# Correct result => [4, 5, 6, 1, 2, 3]
arr = [1, 2, 3, 4, 5, 6]
k = 3
print(rotate_array_1(arr, k))
print(rotate_array_2(arr, k))