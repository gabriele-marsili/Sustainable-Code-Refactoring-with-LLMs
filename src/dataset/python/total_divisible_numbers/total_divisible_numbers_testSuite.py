import unittest
from total_divisible_numbers import total_divisible_numbers

class Test(unittest.TestCase):
    def test_total_divisible_numbers(self):
        self.assertEqual(total_divisible_numbers([3, 5, 6], 146), 4)
        self.assertEqual(total_divisible_numbers([3, 3, 2], 317), 52)
        self.assertEqual(total_divisible_numbers([2, 3], 30), 30)

if __name__ == "__main__":
    unittest.main()