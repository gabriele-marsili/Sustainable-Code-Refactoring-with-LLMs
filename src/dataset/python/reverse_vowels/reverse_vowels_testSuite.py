import unittest
from reverse_vowels import reverse_vowels

class Test(unittest.TestCase):
    def test_reverse_vowels(self):
        self.assertEqual(reverse_vowels('abcdefghijklmnopqrstuvwxyz'), 'ubcdofghijklmnepqrstavwxyz')
        self.assertEqual(reverse_vowels('Hello world'), 'Hollo werld')

if __name__ == "__main__":
    unittest.main()