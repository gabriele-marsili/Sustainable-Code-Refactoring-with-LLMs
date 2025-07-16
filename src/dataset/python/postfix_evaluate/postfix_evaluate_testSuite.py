import unittest
from postfix_evaluate import postfix_evaluate

class Test(unittest.TestCase):
    def test_postfix_evaluate_1(self):
        self.assertEqual(postfix_evaluate([2, 3, '+', 4, '*']), 20)

    def test_postfix_evaluate_2(self):
        self.assertEqual(postfix_evaluate([2, 3, 4, '*', '+']), 14)

    def test_postfix_evaluate_3(self):
        self.assertEqual(postfix_evaluate([3, 3, 3, '-', '/']), 0)

    def test_postfix_evaluate_4(self):
        self.assertEqual(postfix_evaluate([7, 3, '/']), 2)

    def test_postfix_evaluate_5(self):
        self.assertEqual(postfix_evaluate([1, 2, 3, 4, 5, 6, '*', '*', '*', '*', '*']), 720)

if __name__ == "__main__":
    unittest.main()