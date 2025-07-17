import unittest
from trapped_watter import trapped_water

class TestTrappedWater(unittest.TestCase):
    def test_trapped_water_1(self):
        self.assertEqual(trapped_water([1, 1]), 0)
        self.assertEqual(trapped_water([2, 1, 2]), 1)

    def test_trapped_water_2(self):
        self.assertEqual(trapped_water([3, 0, 1, 3, 0, 5]), 8)

    def test_trapped_water_3(self):
        self.assertEqual(trapped_water([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]), 6)

if __name__ == "__main__":
    unittest.main()