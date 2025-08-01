import unittest
from longest_increasing_subsequence import longest_increasing_subsequence_1,longest_increasing_subsequence_2

class TestLongestIncreasingSubsequence(unittest.TestCase):

    def test_1(self):
        arr = [10, 9, 2, 5, 3, 7, 101, 18]
        self.assertEqual(longest_increasing_subsequence_1(arr), [2, 3, 7, 18])

    def test_2(self):
        arr = [1, 2, 3]
        self.assertEqual(longest_increasing_subsequence_2(arr), [1, 2, 3])

    def test_3(self):
        arr = [10, 1, 3, 8, 2, 0, 5, 7, 12, 3]
        self.assertEqual(longest_increasing_subsequence_1(arr), [1, 2, 5, 7, 12])

    def test_4(self):
        arr = [12, 1, 11, 2, 10, 3, 9, 4, 8, 5, 7, 6]
        self.assertEqual(longest_increasing_subsequence_2(arr), [1, 2, 3, 4, 5, 6])

    def test_5(self):
        arr = [1, 4, 2, 0, 3, 1]
        self.assertEqual(longest_increasing_subsequence_1(arr), [1, 2, 3])

    def test_6(self):
        arr = [7, 5, 5, 5, 5, 5, 3]
        self.assertEqual(longest_increasing_subsequence_2(arr), [3])

if __name__ == "__main__":
    unittest.main()