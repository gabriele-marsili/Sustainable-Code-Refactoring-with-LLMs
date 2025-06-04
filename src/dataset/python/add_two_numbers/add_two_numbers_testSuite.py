# import build_ll and print_ll methods from ll_helpers.py
from ll_helpers import build_ll, print_ll

# Test 1
# Correct result => 7 -> 0 -> 8
ll1 = build_ll([2, 4, 3])
ll2 = build_ll([5, 6, 4])
print_ll(add_two_numbers(ll1, ll2))

# Test 2
# Correct result => 8 -> 9 -> 0 -> 0 -> 1
ll1 = build_ll([9, 9, 9, 9])
ll2 = build_ll([9, 9])
print_ll(add_two_numbers(ll1, ll2))