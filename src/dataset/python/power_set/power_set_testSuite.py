import unittest
from power_set import power_set

class Test(unittest.TestCase):
    def test_power_set_1(self):
        self.assertEqual(power_set([1, 2]), [[], [1], [1, 2], [2]])

    def test_power_set_2(self):
        self.assertEqual(power_set([1, 2, 3]), [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]])

if __name__ == "__main__":
    unittest.main()