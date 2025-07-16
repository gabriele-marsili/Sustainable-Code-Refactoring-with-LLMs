import unittest
from flatten_deep_list import flatten_deep_list

class Test(unittest.TestCase):
    def test_1(self):        
        self.assertEqual(flatten_deep_list([ [ [ [ [ [ ] ] ] ] ] ]),[ ])
    def test_2(self):        
        self.assertEqual(flatten_deep_list([[], [[[[89, 85, 72, 84, 65], [[88, 31, 64, 11, 60, 42, 57, 55], 16, [79, 34, 82], [], 94, 36, [89, 26, 39, 94, 47, 72, 30], [72, 3, 73]], 18]], [[37, [51, 75, 83], 94, 57]], [37, 10, 62, 62], [[], 13]]]),[89, 85, 72, 84, 65, 88, 31, 64, 11, 60, 42, 57, 55, 16, 79, 34, 82, 94, 36, 89, 26, 39, 94, 47, 72, 30, 72, 3, 73, 18, 37, 51, 75, 83, 94, 57, 37, 10, 62, 62, 13])
    def test_3(self):        
        self.assertEqual(flatten_deep_list([1, [2, 3, [4, 'bob', 6], [7]], [8, 9]]),[1, 2, 3, 4, 'bob', 6, 7, 8, 9])



if __name__ == "__main__":
    unittest.main()