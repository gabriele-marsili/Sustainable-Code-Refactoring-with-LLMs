import unittest
from find_second_largest_node_bst import find_second_largest_bst_1, find_second_largest_bst_2

class Test(unittest.TestCase):
    def test_1(self):
        tree = TreeNode(5, TreeNode(3, TreeNode(1), TreeNode(4)), TreeNode(8, TreeNode(7), TreeNode(12, TreeNode(10, TreeNode(13)))))
        self.assertEqual(find_second_largest_bst_1(tree).val, 10)
        self.assertEqual(find_second_largest_bst_2(tree).val, 10)

    def test_2(self):
        tree = TreeNode(5, TreeNode(3, TreeNode(1), TreeNode(4)), TreeNode(8, TreeNode(7), TreeNode(12)))
        self.assertEqual(find_second_largest_bst_1(tree).val, 8)
        self.assertEqual(find_second_largest_bst_2(tree).val, 8)

    def test_3(self):
        tree = TreeNode(5, TreeNode(3, TreeNode(1), TreeNode(4)))
        self.assertEqual(find_second_largest_bst_1(tree).val, 4)
        self.assertEqual(find_second_largest_bst_2(tree).val, 4)

    def test_4(self):
        tree = TreeNode(5, TreeNode(3, TreeNode(1), TreeNode(4)), TreeNode(8, TreeNode(6, None, TreeNode(7))))
        self.assertEqual(find_second_largest_bst_1(tree).val, 7)
        self.assertEqual(find_second_largest_bst_2(tree).val, 7)

    def test_5(self):
        tree = TreeNode(5, TreeNode(3, TreeNode(1), TreeNode(4)), TreeNode(8, TreeNode(7), TreeNode(12, TreeNode(9, None, TreeNode(10, None, TreeNode(11))))))
        self.assertEqual(find_second_largest_bst_1(tree).val, 11)
        self.assertEqual(find_second_largest_bst_2(tree).val, 11)

if __name__ == "__main__":
    unittest.main()