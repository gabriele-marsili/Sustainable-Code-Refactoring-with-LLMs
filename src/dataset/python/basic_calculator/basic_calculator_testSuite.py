import unittest
from basic_calculator import basic_calculator

class Test(unittest.TestCase):
    def test_calculator(self):
        self.assertEqual(basic_calculator('(1+(4+5+2)-3)+(6+8)'), 23)
        self.assertEqual(basic_calculator(' 2-1 + 2 '), 3)

if __name__ == "__main__":
    unittest.main()