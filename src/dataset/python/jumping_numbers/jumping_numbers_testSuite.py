import unittest
from jumping_numbers import jumping_numbers

class Test(unittest.TestCase):
    def test_jumping_numbers(self):
        self.assertEqual(jumping_numbers(20), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12])
        self.assertEqual(jumping_numbers(100), [1, 10, 12, 2, 21, 23, 3, 32, 34, 4, 43, 45, 5, 54, 56, 6, 65, 67, 7, 76, 78, 8, 87, 89, 9, 98])

if __name__ == "__main__":
    unittest.main()