import unittest
from count_triplets_with_sum_k import count_triplets_1,count_triplets_2

class Test(unittest.TestCase):
    def test_1(self):      
        arr = [10, 11, 16, 18, 19]
        k = 40        
        print(count_triplets_2(arr, k))  
        self.assertEqual(count_triplets_1(arr, k),1)
        self.assertEqual(count_triplets_2(arr, k),1)
    def test_2(self):        
        arr = [1, 2, 3, 4, 5]
        k = 9
        
        print(count_triplets_2(arr, k))

        self.assertEqual(count_triplets_1(arr, k),2)
        self.assertEqual(count_triplets_2(arr, k),2)
    


if __name__ == "__main__":
    unittest.main()