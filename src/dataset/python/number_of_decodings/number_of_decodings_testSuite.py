import unittest
from number_of_decodings import num_decodings

class Test(unittest.TestCase):
    def test_1(self):
        self.assertEqual(num_decodings('12151'), 5)

    def test_2(self):
        self.assertEqual(num_decodings('1111'), 5)

    def test_3(self):
        self.assertEqual(num_decodings('111'), 3)

    def test_4(self):
        self.assertEqual(num_decodings('1010'), 1)

    def test_5(self):
        self.assertEqual(num_decodings('2626'), 4)

    def test_6(self):
        self.assertEqual(num_decodings('1'), 1)

    def test_7(self):
        self.assertEqual(num_decodings('11'), 2)

    def test_8(self):
        self.assertEqual(num_decodings('111'), 3)

    def test_9(self):
        self.assertEqual(num_decodings('1111'), 5)

    def test_10(self):
        self.assertEqual(num_decodings('11111'), 8)

    def test_11(self):
        self.assertEqual(num_decodings('111111'), 13)

    def test_12(self):
        self.assertEqual(num_decodings('1111111'), 21)

    def test_13(self):
        self.assertEqual(num_decodings('11111111'), 34)

if __name__ == "__main__":
    unittest.main()