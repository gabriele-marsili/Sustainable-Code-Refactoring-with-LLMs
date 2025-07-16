import unittest
from ll_helpers import build_ll, print_ll
from remove_duplicates_sorted_ll import remove_duplicates_sorted_ll

class Test(unittest.TestCase):

    def test_remove_duplicates(self):
        self.assertEqual(print_ll(remove_duplicates_sorted_ll(build_ll([1, 1, 2]))), '1 -> 2\n')
        self.assertEqual(print_ll(remove_duplicates_sorted_ll(build_ll([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]))), '0 -> 1 -> 2 -> 3 -> 4\n')

if __name__ == "__main__":
    unittest.main()