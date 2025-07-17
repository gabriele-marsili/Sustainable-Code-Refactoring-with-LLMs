import unittest
from zigzag_conversion import convert,convert_2

class Test(unittest.TestCase):
    def test_zigzag_conversion(self):
        self.assertEqual(convert('PAYPALISHIRING', 3), 'PAHNAPLSIIGYIR')
        self.assertEqual(convert_2('PAYPALISHIRING', 3), 'PAHNAPLSIIGYIR')
        self.assertEqual(convert('PAYPALISHIRING', 4), 'PINALSIGYAHRPI')
        self.assertEqual(convert_2('PAYPALISHIRING', 4), 'PINALSIGYAHRPI')

if __name__ == "__main__":
    unittest.main()