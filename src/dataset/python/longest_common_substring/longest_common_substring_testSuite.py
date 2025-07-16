import unittest
from longest_common_substring import longest_common_substring

class TestLongestCommonSubstring(unittest.TestCase):

    def test_1(self):
        self.assertEqual(longest_common_substring('ABABC', 'BABCA'), 'BABC')

    def test_2(self):
        self.assertEqual(longest_common_substring('GeeksforGeeks', 'GeeksQuiz'), 'Geeks')

    def test_3(self):
        self.assertEqual(longest_common_substring('abcdxyz', 'xyzabcd'), 'abcd')

    def test_4(self):
        self.assertEqual(longest_common_substring('zxabcdezy', 'yzabcdezx'), 'abcde')

if __name__ == "__main__":
    unittest.main()