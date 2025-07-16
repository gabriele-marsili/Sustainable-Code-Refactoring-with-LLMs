from climbing_staircase import climbing_staircase
import unittest

class TestClimbingStaircase(unittest.TestCase):
    def test_1(self):
        self.assertEqual(climbing_staircase([1, 2], 4), 5)

    def test_2(self):
        self.assertEqual(climbing_staircase([1, 3, 5], 4), 3)

if __name__ == "__main__":
    unittest.main()