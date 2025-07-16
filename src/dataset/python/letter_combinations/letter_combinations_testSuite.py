import unittest
from letter_combinations import letter_combinations

class Test(unittest.TestCase):
    def test_letter_combinations(self):
        self.assertEqual(letter_combinations('23'), ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf'])

if __name__ == "__main__":
    unittest.main()