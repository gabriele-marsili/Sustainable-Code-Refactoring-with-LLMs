import unittest
from queens_problem import place_n_queens

class Test(unittest.TestCase):
    def test_1(self):
        self.assertEqual(place_n_queens(1), 1)

    def test_2(self):
        self.assertEqual(place_n_queens(2), 0)

    def test_3(self):
        self.assertEqual(place_n_queens(3), 0)

    def test_4(self):
        self.assertEqual(place_n_queens(4), 2)

    def test_5(self):
        self.assertEqual(place_n_queens(5), 10)

    def test_6(self):
        self.assertEqual(place_n_queens(6), 4)

    def test_7(self):
        self.assertEqual(place_n_queens(7), 40)

    def test_8(self):
        self.assertEqual(place_n_queens(8), 92)

    def test_9(self):
        self.assertEqual(place_n_queens(9), 352)

    def test_10(self):
        self.assertEqual(place_n_queens(10), 724)

if __name__ == "__main__":
    unittest.main()