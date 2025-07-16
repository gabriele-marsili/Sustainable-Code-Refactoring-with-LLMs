import unittest
from longest_palindromic_substring import longest_palindromic_substring

class Test(unittest.TestCase):
    def test_1(self):
        self.assertEqual(longest_palindromic_substring('google'), 4)

    def test_2(self):
        self.assertEqual(longest_palindromic_substring('sgoaberebaogle'), 11)

    def test_3(self):
        self.assertEqual(longest_palindromic_substring('abcdeef'), 2)

    def test_4(self):
        self.assertEqual(longest_palindromic_substring('racecar'), 7)

    def test_5(self):
        self.assertEqual(longest_palindromic_substring('abbabbc'), 5)

    def test_6(self):
        self.assertEqual(longest_palindromic_substring('forgeeksskeegfor'), 10)

if __name__ == "__main__":
    unittest.main()