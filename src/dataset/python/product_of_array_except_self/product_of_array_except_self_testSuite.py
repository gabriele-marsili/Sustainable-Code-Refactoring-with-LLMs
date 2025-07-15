import unittest
from product_of_array_except_self import product_except_self

class Test(unittest.TestCase):
    def test_1(self):        
        self.assertEqual(product_except_self([1, 2, 3, 4]),[24, 12, 8, 6])



if __name__ == "__main__":
    unittest.main()