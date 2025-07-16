import unittest
from ll_helpers import build_ll, print_ll
from max_difference_subll import max_difference_subll

class Test(unittest.TestCase):
    def test_max_difference_subll(self):
        self.assertEqual(print_ll(max_difference_subll(build_ll([42, 17, 99, 12, 65, 77, 11, 26]), 5)), '99 -> 12 -> 65 -> 77 -> 11')
        self.assertEqual(print_ll(max_difference_subll(build_ll([36, 14, 58, 11, 63, 77, 46, 32, 87]), 5)), '14 -> 58 -> 11 -> 63 -> 77')

if __name__ == "__main__":
    unittest.main()