import unittest
from min_swaps import min_swaps

class TestMinSwaps(unittest.TestCase):
    
    def test_1(self):
        self.assertEqual(min_swaps([4, 1, 3, 2]), 2)

    def test_2(self):
        self.assertEqual(min_swaps([4, 1, 2, 3]), 3)

if __name__ == "__main__":
    unittest.main()
