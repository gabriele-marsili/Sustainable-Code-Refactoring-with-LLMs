import unittest
from valid_parentheses import is_valid

class Test(unittest.TestCase):
    def test_1(self):        
        self.assertEqual(is_valid('(]]])'), False)
    def test_2(self):        
        self.assertEqual(is_valid('()[{([]{]})}]'), False)
    def test_3(self):        
        self.assertEqual(is_valid('()[{([]{})}]'), True)

if __name__ == "__main__":
    unittest.main()