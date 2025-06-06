# Test 1
# Correct result => [1, 2, 3, 4, 'bob', 6, 7, 8, 9]
print(flatten_deep_list([1, [2, 3, [4, 'bob', 6], [7]], [8, 9]]))

# Test 2
# Correct result => [89, 85, 72, 84, 65, 88, 31, 64, 11, 60, 42, 57, 55, 16, 79, 34, 82, 94, 36, 89, 26, 39, 94, 47, 72, 30, 72, 3, 73, 18, 37, 51, 75, 83, 94, 57, 37, 10, 62, 62, 13]
print(flatten_deep_list([[], [[[[89, 85, 72, 84, 65], [[88, 31, 64, 11, 60, 42, 57, 55], 16, [79, 34, 82], [], 94, 36, [89, 26, 39, 94, 47, 72, 30], [72, 3, 73]], 18]], [[37, [51, 75, 83], 94, 57]], [37, 10, 62, 62], [[], 13]]]))

# Test 3
# Correct result => [ ]
print(flatten_deep_list([ [ [ [ [ [ ] ] ] ] ] ]))