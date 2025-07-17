import unittest
from reverse_string import reverse_sentence

class Test(unittest.TestCase):
    def test_reverse_sentence1(self):
        self.assertEqual(reverse_sentence('i like this program very much'), 'hcum yrev margorp siht ekil i')

    def test_reverse_sentence2(self):
        self.assertEqual(reverse_sentence('how are you'), 'uoy era woh')

if __name__ == "__main__":
    unittest.main()