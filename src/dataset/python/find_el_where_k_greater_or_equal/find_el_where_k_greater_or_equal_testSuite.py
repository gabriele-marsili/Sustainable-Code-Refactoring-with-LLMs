import unittest
from find_el_where_k_greater_or_equal import get_minimum_X


class Test(unittest.TestCase):
    def test_1(self):        
        self.assertEqual(get_minimum_X([3, 8, 5, 1, 10, 3, 20, 24], 2),11)
    


if __name__ == "__main__":
    unittest.main()