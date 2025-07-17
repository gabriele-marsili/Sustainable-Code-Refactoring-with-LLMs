import unittest
from encoding_string import encoding

class Test(unittest.TestCase):
    def test_encoding(self):
        self.assertEqual(encoding('AAAABBBCCDAA'), '4A3B2C1D2A')

if __name__ == "__main__":
    unittest.main()