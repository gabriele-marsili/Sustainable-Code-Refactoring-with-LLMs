from create_palindrom import create_palindrome_1,create_palindrome_2
import unittest

class Test(unittest.TestCase):

    def test_1(self):
        word = 'race'
        self.assertEqual(create_palindrome_1(word), 'ecerac')

    def test_2(self):
        word = 'google'
        self.assertEqual(create_palindrome_2(word), 'elgoogel')

    def test_3(self):
        word = 'abcda'
        self.assertEqual(create_palindrome_1(word), 'adcdba')

    def test_4(self):
        word = 'adefgfdcba'
        self.assertEqual(create_palindrome_2(word), 'adefgfdcba')

if __name__ == "__main__":
    unittest.main()