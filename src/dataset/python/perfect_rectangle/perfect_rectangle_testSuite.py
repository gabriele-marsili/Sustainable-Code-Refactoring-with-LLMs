import unittest
from perfect_rectangle import is_perfect_rectangle

class TestPerfectRectangle(unittest.TestCase):

    def test_perfect_rectangle_1(self):
        rectangles = [[1, 1, 3, 3], [3, 1, 4, 2], [3, 2, 4, 4], [1, 3, 2, 4], [2, 3, 3, 4]]
        self.assertTrue(is_perfect_rectangle(rectangles))

    def test_perfect_rectangle_2(self):
        rectangles = [[1, 1, 2, 3], [1, 3, 2, 4], [3, 1, 4, 2], [3, 2, 4, 4]]
        self.assertFalse(is_perfect_rectangle(rectangles))

    def test_perfect_rectangle_3(self):
        rectangles = [[1, 1, 3, 3], [3, 1, 4, 2], [1, 3, 2, 4], [3, 2, 4, 4]]
        self.assertFalse(is_perfect_rectangle(rectangles))

    def test_perfect_rectangle_4(self):
        rectangles = [[1, 1, 3, 3], [3, 1, 4, 2], [1, 3, 2, 4], [2, 2, 4, 4]]
        self.assertFalse(is_perfect_rectangle(rectangles))

if __name__ == "__main__":
    unittest.main()