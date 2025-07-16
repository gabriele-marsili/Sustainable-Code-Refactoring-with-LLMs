import unittest
from count_consecutive_sums import count_consecutive_sums

class Test(unittest.TestCase):
    def test_1(self):
        self.assertEqual(count_consecutive_sums(42), 4)

    def test_2(self):
        self.assertEqual(count_consecutive_sums(99), 6)

    def test_3(self):
        self.assertEqual(count_consecutive_sums(92), 2)

if __name__ == "__main__":
    unittest.main()