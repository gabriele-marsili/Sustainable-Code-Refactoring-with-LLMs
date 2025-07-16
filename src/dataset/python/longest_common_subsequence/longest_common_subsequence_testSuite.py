import unittest
from longest_common_subsequence import longest_common_subsequence

class TestLongestCommonSubsequence(unittest.TestCase):
    def test_1(self):
        self.assertEqual(longest_common_subsequence('ABAZDC', 'BACBAD'), 'ABAD')

    def test_2(self):
        self.assertEqual(longest_common_subsequence("I'm meto", 'I am Meto'), 'Im eto')

if __name__ == "__main__":
    unittest.main()