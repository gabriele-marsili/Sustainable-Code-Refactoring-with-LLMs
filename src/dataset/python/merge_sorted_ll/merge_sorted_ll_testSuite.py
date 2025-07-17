import unittest
from ll_helper import build_ll, print_ll
from merge_sorted_ll import merge_two_sorted_ll

class Test(unittest.TestCase):

    def test_merge_two_sorted_ll_1(self):
        a = build_ll([1, 2, 3, 4, 5])
        b = build_ll([6, 7, 8, 9])
        result = merge_two_sorted_ll(a, b)
        expected = build_ll([1, 2, 3, 4, 5, 6, 7, 8, 9])
        self.assertEqual(print_ll(result), print_ll(expected))

    def test_merge_two_sorted_ll_2(self):
        a = build_ll([1, 3, 5])
        b = build_ll([2, 4, 6, 7])
        result = merge_two_sorted_ll(a, b)
        expected = build_ll([1, 2, 3, 4, 5, 6, 7])
        self.assertEqual(print_ll(result), print_ll(expected))

    def test_merge_two_sorted_ll_3(self):
        a = build_ll([1, 2, 4])
        b = build_ll([1, 3, 4])
        result = merge_two_sorted_ll(a, b)
        expected = build_ll([1, 1, 2, 3, 4, 4])
        self.assertEqual(print_ll(result), print_ll(expected))

if __name__ == "__main__":
    unittest.main()