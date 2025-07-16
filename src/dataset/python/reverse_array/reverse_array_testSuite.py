import unittest
from reverse_array import reverse_arr

class TestReverseArr(unittest.TestCase):

    def test_1(self):
        input_arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        expected = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
        self.assertEqual(reverse_arr(input_arr), expected)

    def test_2(self):
        input_arr = [1, 2, 3, 4, 5]
        expected = [5, 4, 3, 2, 1]
        self.assertEqual(reverse_arr(input_arr), expected)

if __name__ == "__main__":
    unittest.main()
