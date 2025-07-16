import unittest
from strong_password_checker import strong_password_checker

class Test(unittest.TestCase):
    def test_1(self):
        self.assertEqual(strong_password_checker('a'), 5)

    def test_2(self):
        self.assertEqual(strong_password_checker('aA1'), 3)

    def test_3(self):
        self.assertEqual(strong_password_checker('1337C0d3'), 0)

if __name__ == "__main__":
    unittest.main()