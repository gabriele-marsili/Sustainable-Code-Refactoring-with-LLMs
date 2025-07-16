import unittest
from find_duplicates import find_duplicates, find_duplicates_2

class Test(unittest.TestCase):

    def test_find_duplicates(self):
        self.assertEqual(find_duplicates([1, 1, 1, 1]), [1])
        self.assertEqual(find_duplicates([4, 2, 4, 2, 1, 4]), [4, 2])

    def test_find_duplicates_2(self):
        self.assertEqual(find_duplicates_2([1, 1, 1, 1]), [1])
        self.assertEqual(find_duplicates_2([4, 2, 4, 2, 1, 4]), [4, 2])

if __name__ == "__main__":
    unittest.main()