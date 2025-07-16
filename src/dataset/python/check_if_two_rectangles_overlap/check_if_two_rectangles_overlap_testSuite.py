import unittest
from check_if_two_rectangles_overlap import check_if_two_rectangles_overlap

class Test(unittest.TestCase):
    def test_overlap1(self):
        self.assertTrue(check_if_two_rectangles_overlap((0, 0), (3, 2), (1, 1), (5, 4)))

    def test_overlap2(self):
        self.assertTrue(check_if_two_rectangles_overlap((0, 0), (3, 2), (3, 2), (5, 4)))

    def test_overlap3(self):
        self.assertTrue(check_if_two_rectangles_overlap((0, 0), (3, 2), (1, -1), (5, 4)))

    def test_no_overlap(self):
        self.assertFalse(check_if_two_rectangles_overlap((0, 0), (3, 2), (2, 3), (5, 4)))

if __name__ == "__main__":
    unittest.main()