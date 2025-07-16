import unittest
from ll_helpers import build_ll, print_ll
from odd_even_ll import odd_even_ll

class Test(unittest.TestCase):
    def test_1(self):
        result = odd_even_ll(build_ll([1, 2, 3, 4, 5]))
        self.assertEqual(print_ll(result), "1 -> 3 -> 5 -> 2 -> 4")

    def test_2(self):
        result = odd_even_ll(build_ll([2, 1, 3, 5, 6, 4, 7]))
        self.assertEqual(print_ll(result), "2 -> 3 -> 6 -> 7 -> 1 -> 5 -> 4")

if __name__ == "__main__":
    unittest.main()