import unittest
from find_one_missing_number import missing_number


class Test(unittest.TestCase):
    def test_1(self):        
        self.assertEqual(missing_number([2, 1, 4]),3)
    def test_2(self):        
        self.assertEqual(missing_number([2, 3, 1]),4)
    


if __name__ == "__main__":
    unittest.main()