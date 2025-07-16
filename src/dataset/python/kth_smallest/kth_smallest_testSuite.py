import unittest

from kth_smallest import find_kth_smallest_recursive, find_kth_smallest

class TestFindKthSmallest(unittest.TestCase):

    def test_1(self):
        arr = [1, 1, 1, 1, 1, 1]
        expected = [1, 1, 1, 1, 1, 1]
        result_recursive = [find_kth_smallest_recursive(arr, i) for i in range(1, len(arr) + 1)]
        result_iterative = [find_kth_smallest(arr, i) for i in range(1, len(arr) + 1)]
        self.assertEqual(result_recursive, expected)
        self.assertEqual(result_iterative, expected)

    def test_2(self):
        arr = [6, 4, 2, 12, 4, 8, 10, 1, 11, 0, 8, 4]
        expected = [0, 1, 2, 4, 4, 4, 6, 8, 8, 10, 11, 12]
        result_recursive = [find_kth_smallest_recursive(arr, i) for i in range(1, len(arr) + 1)]
        result_iterative = [find_kth_smallest(arr, i) for i in range(1, len(arr) + 1)]
        self.assertEqual(result_recursive, expected)
        self.assertEqual(result_iterative, expected)

    def test_3(self):
        arr = [5, 4, 3, 2, 1]
        expected = [1, 2, 3, 4, 5]
        result_recursive = [find_kth_smallest_recursive(arr, i) for i in range(1, len(arr) + 1)]
        result_iterative = [find_kth_smallest(arr, i) for i in range(1, len(arr) + 1)]
        self.assertEqual(result_recursive, expected)
        self.assertEqual(result_iterative, expected)

if __name__ == "__main__":
    unittest.main()
