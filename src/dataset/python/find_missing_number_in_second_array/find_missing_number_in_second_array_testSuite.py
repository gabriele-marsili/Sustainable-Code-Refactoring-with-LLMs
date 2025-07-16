import unittest
from find_missing_number_in_second_array import find_missing_number,find_missing_number_2

class Test(unittest.TestCase):
    def test_1(self):        
        arr1 = [2131, 2122221, 64565, 33333333, 994188129, 865342234]
        arr2 = [994188129, 2122221, 865342234, 2131, 64565]            
        self.assertEqual(find_missing_number(arr1, arr2),33333333)
        self.assertEqual(find_missing_number_2(arr1, arr2),33333333)
    def test_2(self):        
        arr1 = [1, 2, 3, 4, 5]
        arr2 = [1, 2, 3, 4]
        self.assertEqual(find_missing_number(arr1, arr2),5)
        self.assertEqual(find_missing_number_2(arr1, arr2),5)
    


if __name__ == "__main__":
    unittest.main()