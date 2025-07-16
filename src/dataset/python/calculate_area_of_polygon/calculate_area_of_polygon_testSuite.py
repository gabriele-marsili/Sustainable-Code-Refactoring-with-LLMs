import unittest
from calculate_area_of_polygon import calculate_area_of_polygon

class Test(unittest.TestCase):
    def test_calculate_area_of_polygon(self):
        self.assertEqual(calculate_area_of_polygon([(0, 0), (3, 0), (3, 2), (0, 2)]), 6.0)

if __name__ == "__main__":
    unittest.main()