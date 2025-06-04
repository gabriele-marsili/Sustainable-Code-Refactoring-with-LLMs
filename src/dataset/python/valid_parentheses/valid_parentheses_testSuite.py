# Test 1
# Correct result => True
print(is_valid('()[{([]{})}]'))

# Test 2
# Correct result => False
print(is_valid('()[{([]{]})}]'))

# Test 3
# Correct result => False
print(is_valid('(]]])'))