from subarray_with_sum_k import subarray_with_sum_k
import unittest

class TestSubarrayWithSumK(unittest.TestCase):
    def test_find_subarray(self):
        self.assertEqual(subarray_with_sum_k([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 15), (1, 5))
        self.assertEqual(subarray_with_sum_k([1, 2, 3, 7, 5], 12), (2, 4))
        self.assertEqual(subarray_with_sum_k([6, 6, 6, 6, 3], 3), (5, 5))

if __name__ == "__main__":
    unittest.main()