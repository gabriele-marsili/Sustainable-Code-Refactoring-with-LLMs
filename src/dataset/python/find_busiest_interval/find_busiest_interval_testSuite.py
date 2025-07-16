import unittest
from find_busiest_interval import bussiest_interval


class Test(unittest.TestCase):
    def test_1(self):        
        self.assertEqual(bussiest_interval([1, 2, 10, 5, 5], [4, 5, 12, 9, 12]),(5,5))
    def test_2(self):        
        res = bussiest_interval([30, 0, 60], [75, 50, 150]) == (30, 50) or bussiest_interval([30, 0, 60], [75, 50, 150]) == (60, 75)
        self.assertEqual(res,True) 


if __name__ == "__main__":
    unittest.main()