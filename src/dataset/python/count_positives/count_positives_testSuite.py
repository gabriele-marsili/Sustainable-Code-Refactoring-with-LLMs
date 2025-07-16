import unittest
from count_positives import count_positives

class Test(unittest.TestCase):
    def test_1(self):
        self.assertEqual(count_positives([2, 3, 1]), 4)

if __name__ == "__main__":
    unittest.main()