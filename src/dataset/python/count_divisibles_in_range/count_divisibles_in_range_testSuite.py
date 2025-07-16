import unittest
from count_divisibles_in_range import count_divisibles_in_range

class TestCountDivisiblesInRange(unittest.TestCase):

    def test_1(self):
        self.assertEqual(count_divisibles_in_range(7, 28, 4), 6)

    def test_2(self):
        self.assertEqual(count_divisibles_in_range(-77, 19, 10), 9)

    def test_3(self):
        self.assertEqual(count_divisibles_in_range(-19, -13, 10), 0)

    def test_4(self):
        self.assertEqual(count_divisibles_in_range(1, 10**12 - 1, 5), 199999999999)

    def test_5(self):
        self.assertEqual(count_divisibles_in_range(0, 10**12 - 1, 5), 200000000000)

    def test_6(self):
        self.assertEqual(count_divisibles_in_range(0, 10**12, 5), 200000000001)

if __name__ == "__main__":
    unittest.main()