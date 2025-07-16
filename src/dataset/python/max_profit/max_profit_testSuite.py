import unittest
from max_profit import max_profit

class Test(unittest.TestCase):
    def test_1(self):        
        self.assertEqual(max_profit([7, 6, 4, 3, 1]),0)
    def test_2(self):        
        self.assertEqual(max_profit([1, 2, 3, 4, 5]),5)
    def test_3(self):        
        self.assertEqual(max_profit([7, 1, 5, 3, 6, 4]),7)



if __name__ == "__main__":
    unittest.main()