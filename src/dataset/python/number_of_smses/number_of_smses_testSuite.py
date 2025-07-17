import unittest
from number_of_smses import num_smses

class Test(unittest.TestCase):
    def test_1(self):
        self.assertEqual(num_smses('222'), 4)

    def test_2(self):
        self.assertEqual(num_smses('2202222'), 14)

    def test_3(self):
        self.assertEqual(num_smses('2222222222'), 274)

if __name__ == "__main__":
    unittest.main()