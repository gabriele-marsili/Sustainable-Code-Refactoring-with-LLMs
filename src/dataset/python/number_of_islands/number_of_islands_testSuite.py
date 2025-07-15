import unittest
from number_of_islands import num_of_islands

class Test(unittest.TestCase):
    def test_1(self):      
        res = num_of_islands([['1','1','0','0','0'], ['1','1','0','0','0'], ['0','0','1','0','0'], ['0','0','0','1', '1']])  
        self.assertEqual(res,3)



if __name__ == "__main__":
    unittest.main()