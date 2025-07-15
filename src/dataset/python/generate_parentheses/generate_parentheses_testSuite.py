import unittest
from generate_parentheses import generate_parentheses

class Test(unittest.TestCase):
    def test_1(self):        
        self.assertEqual(generate_parentheses(3),32)



if __name__ == "__main__":
    unittest.main()