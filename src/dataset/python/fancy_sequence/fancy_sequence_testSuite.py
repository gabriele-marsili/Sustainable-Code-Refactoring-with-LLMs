import unittest
from fancy_sequence import Fancy

class TestFancySequence(unittest.TestCase):

    def test_fancy_sequence(self):
        fancy = Fancy()
        fancy.append(2)           # fancy sequence: [2]
        fancy.addAll(3)           # fancy sequence: [2+3] -> [5]
        fancy.append(7)           # fancy sequence: [5, 7]
        fancy.multAll(2)          # fancy sequence: [5*2, 7*2] -> [10, 14]
        self.assertEqual(fancy.getIndex(0), 10)
        fancy.addAll(3)           # fancy sequence: [10+3, 14+3] -> [13, 17]
        fancy.append(10)          # fancy sequence: [13, 17, 10]
        fancy.multAll(2)          # fancy sequence: [13*2, 17*2, 10*2] -> [26, 34, 20]
        self.assertEqual(fancy.getIndex(0), 26)
        self.assertEqual(fancy.getIndex(1), 34)
        self.assertEqual(fancy.getIndex(2), 20)

if __name__ == "__main__":
    unittest.main()