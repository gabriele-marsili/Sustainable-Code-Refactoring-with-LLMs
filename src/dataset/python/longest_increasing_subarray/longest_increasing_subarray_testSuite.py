import unittest
from longest_increasing_subarray import longest_increasing_subarray

class Test(unittest.TestCase):
    def test_1(self):        
        self.assertEqual(longest_increasing_subarray([10, 1, 3, 8, 2, 0, 5, 7, 12, 3]),4)



if __name__ == "__main__":
    unittest.main()