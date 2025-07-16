import unittest
from palindrome_integer import palindrome_integer_1, palindrome_integer_2

class Test(unittest.TestCase):
    def test_palindrome_integer_1(self):
        x = 121
        self.assertTrue(palindrome_integer_1(x))
        x = -121
        self.assertFalse(palindrome_integer_1(x))
        x = 10
        self.assertFalse(palindrome_integer_1(x))

    def test_palindrome_integer_2(self):
        x = 121
        self.assertTrue(palindrome_integer_2(x))
        x = -121
        self.assertFalse(palindrome_integer_2(x))
        x = 10
        self.assertFalse(palindrome_integer_2(x))

if __name__ == "__main__":
    unittest.main()