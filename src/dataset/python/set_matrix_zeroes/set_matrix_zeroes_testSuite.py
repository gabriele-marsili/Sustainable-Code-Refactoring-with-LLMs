import unittest
from set_matrix_zeroes import set_matrix_zeroes

class Test(unittest.TestCase):
    def test_set_matrix_zeroes(self):
        # Test 1
        mat = [[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]
        set_matrix_zeroes(mat)
        self.assertEqual(mat, [[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]])

        # Test 2
        mat = [[1, 1, 1], [1, 0, 1], [1, 1, 1]]
        set_matrix_zeroes(mat)
        self.assertEqual(mat, [[1, 0, 1], [0, 0, 0], [1, 0, 1]])

if __name__ == "__main__":
    unittest.main()