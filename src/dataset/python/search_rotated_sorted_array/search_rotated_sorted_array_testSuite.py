import unittest
from search_rotated_sorted_array import search_rotated_sorted_array

class Test(unittest.TestCase):    
    def test_1(self):        
        self.assertEqual(search_rotated_sorted_array([4, 5, 6, 7, 0, 1, 2],0),4)



if __name__ == "__main__":
    unittest.main()