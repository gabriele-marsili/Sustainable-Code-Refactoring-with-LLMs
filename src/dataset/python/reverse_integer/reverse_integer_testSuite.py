import unittest
from reverse_integer import reverse_integer

class Test(unittest.TestCase):
    def test_1(self):
        self.assertEqual(reverse_integer(123), 321)

    def test_2(self):
        self.assertEqual(reverse_integer(-123), -321)

    def test_3(self):
        self.assertEqual(reverse_integer(120), 21)

if __name__ == "__main__":
    unittest.main()