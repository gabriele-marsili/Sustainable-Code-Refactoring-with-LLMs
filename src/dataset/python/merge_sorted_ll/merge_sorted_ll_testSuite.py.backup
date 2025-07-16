from .testing_ll import build_ll, print_ll

# Test 1
# Correct result => 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9
a = build_ll([1, 2, 3, 4, 5])
b = build_ll([6, 7, 8, 9])
print_ll(merge_two_sorted_ll(a, b))

# Test 2
# Correct result => 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7
a = build_ll([1, 3, 5])
b = build_ll([2, 4, 6, 7])
print_ll(merge_two_sorted_ll(a, b))

# Test 3
# Correct result => 1 -> 1 -> 2 -> 3 -> 4 -> 4
a = build_ll([1, 2, 4])
b = build_ll([1, 3, 4])
print_ll(merge_two_sorted_ll(a, b))