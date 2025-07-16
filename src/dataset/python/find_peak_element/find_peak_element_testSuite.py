import unittest
from find_peak_element import find_peak_element


class Test(unittest.TestCase):
    def test_1(self):        
        res = find_peak_element([1, 2, 1, 3, 5, 6, 4]) == 1 or find_peak_element([1, 2, 1, 3, 5, 6, 4]) == 5
        self.assertEqual(res,True) 
    def test_2(self):        
        self.assertEqual(find_peak_element([1, 2, 3, 1]),2)
    


if __name__ == "__main__":
    unittest.main()