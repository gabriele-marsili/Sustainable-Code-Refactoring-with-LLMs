import unittest
from odd_sum import odd_sum

class Test(unittest.TestCase):
    def test_odd_sum(self):
        self.assertEqual(odd_sum(3, 9), 24)

if __name__ == "__main__":
    unittest.main()