import unittest
from anagram_indices import anagram_indices

class Test(unittest.TestCase):
    def test_anagram_indices(self):
        self.assertEqual(anagram_indices('abxaba', 'ab'), [0, 3, 4])

if __name__ == "__main__":
    unittest.main()