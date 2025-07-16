import unittest

from rotate_array import rotate_array_1, rotate_array_2

class TestRotateArray(unittest.TestCase):

    def test_1(self):
        arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        k = 7
        expected = [4, 5, 6, 7, 8, 9, 10, 1, 2, 3]
        self.assertEqual(rotate_array_1(list(arr), k), expected)
        self.assertEqual(rotate_array_2(list(arr), k), expected)

    def test_2(self):
        arr = [1, 2, 3, 4, 5, 6]
        k = 1
        expected = [6, 1, 2, 3, 4, 5]
        self.assertEqual(rotate_array_1(list(arr), k), expected)
        self.assertEqual(rotate_array_2(list(arr), k), expected)

    def test_3(self):
        arr = [1, 2, 3, 4, 5, 6]
        k = 3
        expected = [4, 5, 6, 1, 2, 3]
        self.assertEqual(rotate_array_1(list(arr), k), expected)
        self.assertEqual(rotate_array_2(list(arr), k), expected)


if __name__ == "__main__":
    unittest.main()
