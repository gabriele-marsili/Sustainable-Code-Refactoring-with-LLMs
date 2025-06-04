# import build_ll and print_ll methods from ll_helpers.py
from ll_helpers import build_ll, print_ll

# Test 1
# Correct result => 2 -> 2
print_ll(remove_element(build_ll([3, 2, 2, 3]), 3))

# Test 2
# Correct result => 0 -> 1 -> 3 -> 0 -> 4
print_ll(remove_element(build_ll([0, 1, 2, 3, 0, 4, 2]), 2))