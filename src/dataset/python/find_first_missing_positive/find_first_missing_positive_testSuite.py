import unittest
from find_first_missing_positive import find_first_missing_1, find_first_missing_2

class TestFindFirstMissing(unittest.TestCase):
    
    def test_1(self):
        test = [-1, 2, 3]
        self.assertEqual(find_first_missing_1(list(test)), 1)
        self.assertEqual(find_first_missing_2(list(test)), 1)

    def test_2(self):
        test = [3, 4, -1, 1]
        self.assertEqual(find_first_missing_1(list(test)), 2)
        self.assertEqual(find_first_missing_2(list(test)), 2)

    def test_3(self):
        test = [1, 2, 0]
        self.assertEqual(find_first_missing_1(list(test)), 3)
        self.assertEqual(find_first_missing_2(list(test)), 3)

    def test_4(self):
        test = [1, 2, 3]
        self.assertEqual(find_first_missing_1(list(test)), 4)
        self.assertEqual(find_first_missing_2(list(test)), 4)

    def test_5(self):
        test = [-4, -1, -3, -1]
        self.assertEqual(find_first_missing_1(list(test)), 1)
        self.assertEqual(find_first_missing_2(list(test)), 1)

    def test_6(self):
        test = [2, 1, 2, -1, 0, 20]
        self.assertEqual(find_first_missing_1(list(test)), 3)
        self.assertEqual(find_first_missing_2(list(test)), 3)

    def test_7(self):
        test = [1, 2, 5, 5, 1, 2]
        self.assertEqual(find_first_missing_1(list(test)), 3)
        self.assertEqual(find_first_missing_2(list(test)), 3)

    def test_8(self):
        test = [1, 2, 3, 5, 1, 2, 3, 3]
        self.assertEqual(find_first_missing_1(list(test)), 4)
        self.assertEqual(find_first_missing_2(list(test)), 4)


if __name__ == "__main__":
    unittest.main()
