import unittest
from top_k_frequent_elements import top_k_frequent_1, top_k_frequent_2

class Test(unittest.TestCase):
    def test_1(self):        
        self.assertEqual(top_k_frequent_1([1, 1, 1, 2, 2, 3], 2),[1,2])
    def test_2(self):        
        self.assertEqual(top_k_frequent_2([1, 1, 1, 2, 2, 3], 2),[1,2])
    def test_3(self):        
        self.assertEqual(top_k_frequent_1([1],1),[1])
    def test_4(self):        
        self.assertEqual(top_k_frequent_2([1],1),[1])



if __name__ == "__main__":
    unittest.main()