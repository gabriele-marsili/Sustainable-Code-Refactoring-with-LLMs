# Test 1
# Correct result => True
rectangles = [[1, 1, 3, 3], [3, 1, 4, 2], [3, 2, 4, 4], [1, 3, 2, 4], [2, 3, 3, 4]]
print(is_perfect_rectangle(rectangles))

# Test 2
# Correct result => False
rectangles = [[1, 1, 2, 3], [1, 3, 2, 4], [3, 1, 4, 2], [3, 2, 4, 4]]
print(is_perfect_rectangle(rectangles))

# Test 3
# Correct result => False
rectangles = [[1, 1, 3, 3], [3, 1, 4, 2], [1, 3, 2, 4], [3, 2, 4, 4]]
print(is_perfect_rectangle(rectangles))

# Test 4
# Correct result => False
rectangles = [[1, 1, 3, 3], [3, 1, 4, 2], [1, 3, 2, 4], [2, 2, 4, 4]]
print(is_perfect_rectangle(rectangles))