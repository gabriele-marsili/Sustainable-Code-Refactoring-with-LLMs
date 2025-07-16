import unittest
from longest_common_prefix import longest_common_prefix

class Test(unittest.TestCase):
    def test_1(self):
        self.assertEqual(longest_common_prefix(['flower', 'flow', 'flight']), 'fl')

    def test_2(self):
        self.assertEqual(longest_common_prefix(['dog', 'racecar', 'car']), '')

    def test_3(self):
        self.assertEqual(longest_common_prefix(['aa', 'a']), 'a')

if __name__ == "__main__":
    unittest.main()