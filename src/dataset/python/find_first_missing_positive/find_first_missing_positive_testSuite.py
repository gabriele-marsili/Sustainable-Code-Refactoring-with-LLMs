# Test 1
# Correct result => 1
test = [-1, 2, 3]
print(find_first_missing_1(list(test))) # make a copy, the list will be changed inside the function
print(find_first_missing_2(list(test)))

# Test 2
# Correct result => 2
test = [3, 4, -1, 1]
print(find_first_missing_1(list(test)))
print(find_first_missing_2(list(test)))

# Test 3
# Correct result => 3
test = [1, 2, 0]
print(find_first_missing_1(list(test)))
print(find_first_missing_2(list(test)))

# Test 4
# Correct result => 4
test = [1, 2, 3]
print(find_first_missing_1(list(test)))
print(find_first_missing_2(list(test)))

# Test 5
# Correct result => 1
test = [-4, -1, -3, -1]
print(find_first_missing_1(list(test)))
print(find_first_missing_2(list(test)))

# Test 6
# Correct result => 3
test = [2, 1, 2, -1, 0, 20]
print(find_first_missing_1(list(test)))
print(find_first_missing_2(list(test)))

# Test 7
# Correct result => 3
test = [1, 2, 5, 5, 1, 2]
print(find_first_missing_1(list(test)))
print(find_first_missing_2(list(test)))

# Test 8
# Correct result => 4
test = [1, 2, 3, 5, 1, 2, 3, 3]
print(find_first_missing_1(list(test)))
print(find_first_missing_2(list(test)))