import unittest
from ll_helpers import build_ll, print_ll
from remove_element_ll import remove_element_ll

class Test(unittest.TestCase):

    def test_remove_element_1(self):
        self.assertEqual(print_ll(remove_element_ll(build_ll([3, 2, 2, 3]), 3)), '2 -> 2')

    def test_remove_element_2(self):
        self.assertEqual(print_ll(remove_element_ll(build_ll([0, 1, 2, 3, 0, 4, 2]), 2)), '0 -> 1 -> 3 -> 0 -> 4')

if __name__ == "__main__":
    unittest.main()