import unittest
from permutations import permutations

class Test(unittest.TestCase):
    def test_permutations(self):
        self.assertEqual(permutations([1, 2, 3]), [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]])

if __name__ == "__main__":
    unittest.main()