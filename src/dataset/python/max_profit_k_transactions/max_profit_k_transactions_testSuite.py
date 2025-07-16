import unittest
from max_profit_k_transactions import max_profit_k_transactions

class Test(unittest.TestCase):
    def test_max_profit_k_transactions(self):
        self.assertEqual(max_profit_k_transactions([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10), 45)
        self.assertEqual(max_profit_k_transactions([5, 11, 3, 50, 60, 90], 2), 93)

if __name__ == "__main__":
    unittest.main()