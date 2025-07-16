import unittest
from river_sizes import river_sizes

class Test(unittest.TestCase):
    def test_river_sizes(self):
        matrix = [
            [1, 0, 0, 1],
            [1, 0, 1, 0],
            [0, 0, 1, 0],
            [1, 0, 1, 0]
        ]
        self.assertEqual(river_sizes(matrix), [2, 1, 3, 1])

if __name__ == "__main__":
    unittest.main()