import unittest
from coin_change import coin_change_1,coin_change_2

class TestCoinChange(unittest.TestCase):
    def test_coin_change(self):
        coins = [1, 2, 5]
        amount = 11
        self.assertEqual(coin_change_1(coins, amount), 3)

    def test_coin_change_negative(self):
        coins = [2]
        amount = 3
        self.assertEqual(coin_change_2(coins, amount), -1)

if __name__ == "__main__":
    unittest.main()