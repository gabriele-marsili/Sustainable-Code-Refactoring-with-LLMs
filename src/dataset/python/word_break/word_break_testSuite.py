import unittest
from word_break import word_break

class Test(unittest.TestCase):
    def test_1(self):
        self.assertEqual(word_break('thequickbrownfox', ['quick', 'brown', 'the', 'fox']), ['the', 'quick', 'brown', 'fox'])

    def test_2(self):
        self.assertEqual(word_break('bedbathandbeyond', ['bed', 'bath', 'bedbath', 'and', 'beyond']), ['bedbath', 'and', 'beyond'])

    def test_3(self):
        self.assertEqual(word_break('bedbathandbeyond', ['bed', 'and', 'bath', 'bedbath', 'bathand', 'beyond', 'andbeyond']), ['bedbath', 'andbeyond'])

    def test_4(self):
        self.assertIsNone(word_break('bedbathandbeyo', ['bed', 'bath', 'bedbath', 'bathand', 'beyond']))

    def test_5(self):
        self.assertEqual(word_break('3141592653589793238462643383279', ['314', '49', '9001', '15926535897', '14', '9323', '8462643383279', '4', '793']), ['314', '15926535897', '9323', '8462643383279'])

    def test_6(self):
        self.assertEqual(word_break('ilikelikeimangoiii', ['mobile', 'samsung', 'sam', 'sung', 'man', 'mango', 'icecream', 'and', 'go', 'i', 'like', 'ice', 'cream']), ['i', 'like', 'like', 'i', 'mango', 'i', 'i', 'i'])

if __name__ == "__main__":
    unittest.main()