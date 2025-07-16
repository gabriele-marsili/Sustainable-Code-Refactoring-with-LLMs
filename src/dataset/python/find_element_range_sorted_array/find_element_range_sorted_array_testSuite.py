import unittest
from find_element_range_sorted_array import search_range


class Test(unittest.TestCase):
    def test_1(self):        
        self.assertEqual(search_range([5, 7, 7, 8, 8, 10], 6),[-1, -1])
    def test_2(self):        
        self.assertEqual(search_range([5, 7, 7, 8, 8, 10], 8),[3,4])
    


if __name__ == "__main__":
    unittest.main()