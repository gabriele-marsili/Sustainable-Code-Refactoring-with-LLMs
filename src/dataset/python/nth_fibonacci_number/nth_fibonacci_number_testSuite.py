import unittest
from nth_fibonacci_number import nth_fibonacci_1, nth_fibonacci_2, nth_fibonacci_3, nth_fibonacci_4, nth_fibonacci_5, nth_fibonacci_6, nth_fibonacci_7, nth_fibonacci_8

class Test(unittest.TestCase):
    def test_nth_fibonacci(self):
        n = 8
        self.assertEqual(nth_fibonacci_1(n), 21)
        self.assertEqual(nth_fibonacci_2(n), 21)
        self.assertEqual(nth_fibonacci_3(n), 21)
        self.assertEqual(nth_fibonacci_4(n), 21)
        self.assertEqual(nth_fibonacci_5(n), 21)
        self.assertEqual(nth_fibonacci_6(n), 21)
        self.assertEqual(nth_fibonacci_7(n), 21)
        self.assertEqual(nth_fibonacci_8(n), 21)

        n = 21
        self.assertEqual(nth_fibonacci_1(n), 10946)
        self.assertEqual(nth_fibonacci_2(n), 10946)
        self.assertEqual(nth_fibonacci_3(n), 10946)
        self.assertEqual(nth_fibonacci_4(n), 10946)
        self.assertEqual(nth_fibonacci_5(n), 10946)
        self.assertEqual(nth_fibonacci_6(n), 10946)
        self.assertEqual(nth_fibonacci_7(n), 10946)
        self.assertEqual(nth_fibonacci_8(n), 10946)

if __name__ == "__main__":
    unittest.main()