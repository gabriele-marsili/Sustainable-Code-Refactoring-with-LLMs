import unittest
from swap_first_and_last_word import swap_first_and_last_word

class Test(unittest.TestCase):
    def test_swap_first_and_last_word(self):
        self.assertEqual(swap_first_and_last_word('perfect makes practice'), 'practice makes perfect')
        self.assertEqual(swap_first_and_last_word('i like this program very much'), 'much like this program very i')

if __name__ == "__main__":
    unittest.main()