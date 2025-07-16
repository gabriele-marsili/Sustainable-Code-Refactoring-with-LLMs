import unittest
from prime_factors import prime_factors

class TestPrimeFactors(unittest.TestCase):

    def test_prime_factors_1(self):
        self.assertEqual(prime_factors(42), [2, 3, 7])

    def test_prime_factors_2(self):
        self.assertEqual(prime_factors(10**6), [2, 2, 2, 2, 2, 2, 5, 5, 5, 5, 5, 5])

    def test_prime_factors_3(self):
        self.assertEqual(prime_factors(1234567), [127, 9721])

if __name__ == "__main__":
    unittest.main()