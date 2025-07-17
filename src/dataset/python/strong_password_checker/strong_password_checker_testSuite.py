import unittest
from strong_password_checker import strongPasswordChecker

class Test(unittest.TestCase):
    def test_1(self):
        self.assertEqual(strongPasswordChecker('a'), 5)

    def test_2(self):
        self.assertEqual(strongPasswordChecker('aA1'), 3)

    def test_3(self):
        self.assertEqual(strongPasswordChecker('1337C0d3'), 0)

if __name__ == "__main__":
    unittest.main()