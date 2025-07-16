import unittest
from smallest_multiple import smallest_multiple

class Test(unittest.TestCase):
    def test_smallest_multiple_1(self):
        self.assertEqual(smallest_multiple(1, 10), 2520)

    def test_smallest_multiple_2(self):
        self.assertEqual(smallest_multiple(1, 20), 232792560)

if __name__ == "__main__":
    unittest.main()