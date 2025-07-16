import unittest
from same_tree import TreeNode, is_same_tree

class Test(unittest.TestCase):
    def test_same_tree_1(self):
        p = TreeNode(1, TreeNode(2), TreeNode(3))
        q = TreeNode(1, TreeNode(2), TreeNode(3))
        self.assertTrue(is_same_tree(p, q))

    def test_same_tree_2(self):
        p = TreeNode(1, TreeNode(2))
        q = TreeNode(1, None, TreeNode(2))
        self.assertFalse(is_same_tree(p, q))

if __name__ == "__main__":
    unittest.main()