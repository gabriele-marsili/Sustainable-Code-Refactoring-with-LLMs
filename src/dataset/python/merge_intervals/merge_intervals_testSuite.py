import unittest
from merge_intervals import merge_intervals

class TestMergeIntervals(unittest.TestCase):

    def test_1(self):
        intervals = [(1, 5), (2, 6)]
        expected = [(1, 6)]
        self.assertEqual(merge_intervals(intervals), expected)

    def test_2(self):
        intervals = [(2, 4), (5, 5), (6, 8)]
        expected = [(2, 8)]
        self.assertEqual(merge_intervals(intervals), expected)

    def test_3(self):
        intervals = [(1, 4), (6, 9), (8, 10)]
        expected = [(1, 4), (6, 10)]
        self.assertEqual(merge_intervals(intervals), expected)

if __name__ == "__main__":
    unittest.main()
