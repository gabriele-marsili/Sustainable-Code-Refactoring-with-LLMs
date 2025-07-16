import unittest
from ll_helpers import build_ll, print_ll
from add_two_numbers import add_two_numbers

class TestAddTwoNumbers(unittest.TestCase):

    def test_add_two_numbers_1(self):
        ll1 = build_ll([2, 4, 3])
        ll2 = build_ll([5, 6, 4])
        result = add_two_numbers(ll1, ll2)
        print_ll(result)

    def test_add_two_numbers_2(self):
        ll1 = build_ll([9, 9, 9, 9])
        ll2 = build_ll([9, 9])
        result = add_two_numbers(ll1, ll2)
        print_ll(result)

if __name__ == "__main__":
    unittest.main()