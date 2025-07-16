import unittest
from find_max_path_sum import find_max_path_sum, TreeNode

class TestMaxPathSum(unittest.TestCase):

    def test_1(self):
        tree = TreeNode(1, TreeNode(2, TreeNode(4), TreeNode(5)), TreeNode(3, TreeNode(6), TreeNode(7)))
        self.assertEqual(find_max_path_sum(tree), 18)

    def test_2(self):
        tree = TreeNode(-1, TreeNode(-2, TreeNode(-4), TreeNode(-5)), TreeNode(3, TreeNode(2), TreeNode(5)))
        self.assertEqual(find_max_path_sum(tree), 10)

    def test_3(self):
        tree = TreeNode(1, TreeNode(7, TreeNode(-4), TreeNode(-5)), TreeNode(3, TreeNode(6), TreeNode(2)))
        self.assertEqual(find_max_path_sum(tree), 17)

    def test_4(self):
        tree = TreeNode(1, TreeNode(2, TreeNode(-4), TreeNode(-5)), TreeNode(3, TreeNode(-2), TreeNode(-3)))
        self.assertEqual(find_max_path_sum(tree), 6)

if __name__ == "__main__":
    unittest.main()