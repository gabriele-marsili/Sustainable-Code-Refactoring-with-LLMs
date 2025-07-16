import unittest
from ordered_digits import ordered_digits

class TestOrderedDigits(unittest.TestCase):

    def test_ordered_digits_1(self):
        self.assertEqual(ordered_digits('301'), 3)

    def test_ordered_digits_2(self):
        self.assertEqual(ordered_digits('901'), 1)

    def test_ordered_digits_3(self):
        self.assertEqual(ordered_digits('5982'), 4)

if __name__ == "__main__":
    unittest.main()