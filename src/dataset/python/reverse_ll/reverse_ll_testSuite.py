import unittest
from ll_helpers import build_ll, print_ll
from reverse_ll import reverse_ll
from reverse_ll import reverse_ll_2

class Test(unittest.TestCase):

    def test_reverse_ll(self):
        self.assertEqual(print_ll(reverse_ll(build_ll([1, 2, 3, 4]))), '4 -> 3 -> 2 -> 1')
        self.assertEqual(print_ll(reverse_ll_2(build_ll([1, 2, 3, 4]))), '4 -> 3 -> 2 -> 1')

if __name__ == "__main__":
    unittest.main()