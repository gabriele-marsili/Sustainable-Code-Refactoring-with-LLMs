import unittest
from find_kth_smallest_node_bst import find_kth_smallest_node_bst, TreeNode

class Test(unittest.TestCase):
    def test_1(self):
        tree = TreeNode(5, TreeNode(3, TreeNode(1), TreeNode(4)), TreeNode(8, TreeNode(7), TreeNode(12, TreeNode(10, TreeNode(9)))))
        self.assertEqual(find_kth_smallest_node_bst(tree, 7).val, 9)

    def test_2(self):
        tree = TreeNode(5, TreeNode(3, TreeNode(1), TreeNode(4)), TreeNode(8, TreeNode(7), TreeNode(12)))
        self.assertEqual(find_kth_smallest_node_bst(tree, 4).val, 5)

    def test_3(self):
        tree = TreeNode(5, TreeNode(3, TreeNode(1), TreeNode(4)))
        self.assertEqual(find_kth_smallest_node_bst(tree, 2).val, 3)

    def test_4(self):
        tree = TreeNode(5, TreeNode(3, TreeNode(1), TreeNode(4)), TreeNode(8, TreeNode(6, None, TreeNode(7))))
        self.assertEqual(find_kth_smallest_node_bst(tree, 5).val, 6)

    def test_5(self):
        tree = TreeNode(5, TreeNode(3, TreeNode(1), TreeNode(4)), TreeNode(8, TreeNode(7), TreeNode(12, TreeNode(9, None, TreeNode(10, None, TreeNode(11))))))
        self.assertEqual(find_kth_smallest_node_bst(tree, 7).val, 9)

if __name__ == "__main__":
    unittest.main()