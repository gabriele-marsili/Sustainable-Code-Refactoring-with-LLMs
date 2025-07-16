import unittest
from find_two_missing_numbers import missing_numbers


class Test(unittest.TestCase):
    def test_1(self):        
        self.assertEqual(missing_numbers([2, 3, 4]),[1,5])
    def test_2(self):        
        self.assertEqual(missing_numbers([5, 3, 4]),[1, 2])
    def test_3(self):        
        self.assertEqual(missing_numbers([2, 3, 1]),[4,5])


if __name__ == "__main__":
    unittest.main()