import unittest
from valid_bst import TreeNode, is_valid_bst

class Test(unittest.TestCase):
    def test_1(self):
        root = TreeNode(5, TreeNode(1), TreeNode(4, TreeNode(3), TreeNode(6)))
        self.assertFalse(is_valid_bst(root))

    def test_2(self):
        root = TreeNode(5, TreeNode(1), TreeNode(6, TreeNode(4), TreeNode(7)))
        self.assertFalse(is_valid_bst(root))

    def test_3(self):
        root = TreeNode(5, TreeNode(1), TreeNode(6, TreeNode(7), TreeNode(8)))
        self.assertFalse(is_valid_bst(root))

    def test_4(self):
        root = TreeNode(5, TreeNode(1), TreeNode(7, TreeNode(6), TreeNode(8)))
        self.assertTrue(is_valid_bst(root))

if __name__ == "__main__":
    unittest.main()