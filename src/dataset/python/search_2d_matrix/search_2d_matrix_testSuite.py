import unittest
from search_2d_matrix import search_2d_matrix

class TestSearch2DMatrix(unittest.TestCase):
    def test_search_2d_matrix_true(self):
        self.assertTrue(search_2d_matrix([[1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30]], 21))

    def test_search_2d_matrix_false(self):
        self.assertFalse(search_2d_matrix([[1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30]], 20))

if __name__ == "__main__":
    unittest.main()