import unittest
from check_if_point_inside_polygon import check_if_point_inside_polygon

class Test(unittest.TestCase):
    def test_1(self):
        self.assertTrue(check_if_point_inside_polygon([(0, 0), (3, 0), (3, 2), (0, 2)], (1, 1)))

    def test_2(self):
        self.assertTrue(check_if_point_inside_polygon([(0, 0), (3, 0), (3, 2), (0, 2)], (1, 0)))

    def test_3(self):
        self.assertTrue(check_if_point_inside_polygon([(0, 0), (3, 0), (3, 2), (0, 2)], (3, 1)))

    def test_4(self):
        self.assertTrue(check_if_point_inside_polygon([(0, 0), (3, 0), (3, 2), (0, 2)], (3, 0)))

    def test_5(self):
        self.assertFalse(check_if_point_inside_polygon([(0, 0), (3, 0), (3, 2), (0, 2)], (3, 3)))

if __name__ == "__main__":
    unittest.main()