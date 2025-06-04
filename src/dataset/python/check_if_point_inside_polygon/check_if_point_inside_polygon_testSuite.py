# Test 1
# Correct result => True
print(check_if_point_inside_polygon([(0, 0), (3, 0), (3, 2), (0, 2)], (1, 1)))

# Test 2
# Correct result => True
print(check_if_point_inside_polygon([(0, 0), (3, 0), (3, 2), (0, 2)], (1, 0)))

# Test 3
# Correct result => True
print(check_if_point_inside_polygon([(0, 0), (3, 0), (3, 2), (0, 2)], (3, 1)))

# Test 3
# Correct result => True
print(check_if_point_inside_polygon([(0, 0), (3, 0), (3, 2), (0, 2)], (3, 0)))

# Test 3
# Correct result => False
print(check_if_point_inside_polygon([(0, 0), (3, 0), (3, 2), (0, 2)], (3, 3)))