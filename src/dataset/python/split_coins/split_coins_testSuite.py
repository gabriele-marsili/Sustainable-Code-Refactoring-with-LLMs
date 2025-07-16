import unittest
from split_coins import split_coins

class Test(unittest.TestCase):
    def test_split_coins(self):
        self.assertEqual(split_coins([1, 1, 1, 3, 5, 10, 18]), 1)

if __name__ == "__main__":
    unittest.main()