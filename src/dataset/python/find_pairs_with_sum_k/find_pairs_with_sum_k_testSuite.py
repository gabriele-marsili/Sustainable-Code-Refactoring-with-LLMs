import unittest
from find_pairs_with_sum_k import find_pairs

class Test(unittest.TestCase):
    def test_find_pairs(self):
        self.assertEqual(find_pairs([1, 2, 2, 3, 4, 5, 5, 5, 6, 7, 8, 8, 9], 10), [(1, 9), (2, 8), (3, 7), (4, 6), (5, 5)])

if __name__ == "__main__":
    unittest.main()