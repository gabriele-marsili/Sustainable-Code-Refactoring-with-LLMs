import unittest
from longest_substring_with_k_distinct_characters import longest_substring_with_k_distinct_characters

class Test(unittest.TestCase):
    def test_1(self):
        self.assertEqual(longest_substring_with_k_distinct_characters('abcba', 2), 3)

    def test_2(self):
        self.assertEqual(longest_substring_with_k_distinct_characters('abcbcbcbba', 2), 8)

if __name__ == "__main__":
    unittest.main()