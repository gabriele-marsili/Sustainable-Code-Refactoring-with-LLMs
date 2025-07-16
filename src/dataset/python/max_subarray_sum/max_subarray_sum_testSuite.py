import unittest
from max_subarray_sum import max_subarray_sum

class TestMaxSubarraySum(unittest.TestCase):
    def test_1(self):
        self.assertEqual(max_subarray_sum([-2, -3, 4, -1, -2, 1, 5, -3]), 7)

    def test_2(self):
        self.assertEqual(max_subarray_sum([1, -2, 2, -2, 3, -2, 4, -5]), 5)

    def test_3(self):
        self.assertEqual(max_subarray_sum([-2, -5, 6, -2, -3, 1, 5, -6]), 7)

    def test_4(self):
        self.assertEqual(max_subarray_sum([-6, -1]), -1)

if __name__ == "__main__":
    unittest.main()