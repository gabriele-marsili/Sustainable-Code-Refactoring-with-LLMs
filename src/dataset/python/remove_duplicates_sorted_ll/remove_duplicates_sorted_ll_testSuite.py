# import build_ll and print_ll methods from ll_helpers.py
from ll_helpers import build_ll, print_ll

# Test 1
# Correct result => 1 -> 2
print_ll(remove_duplicates(build_ll([1, 1, 2])))

# Test 2
# Correct result => 0 -> 1 -> 2 -> 3 -> 4
print_ll(remove_duplicates(build_ll([0, 0, 1, 1, 1, 2, 2, 3, 3, 4])))