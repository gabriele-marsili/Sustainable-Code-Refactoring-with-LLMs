import unittest
from reverse_words_in_sentence import reverse_words_in_sentence

class TestReverseWordsInSentence(unittest.TestCase):

    def test_1(self):
        self.assertEqual(reverse_words_in_sentence('i like this program very much'), 'much very program this like i')

    def test_2(self):
        self.assertEqual(reverse_words_in_sentence('how are you'), 'you are how')

if __name__ == "__main__":
    unittest.main()