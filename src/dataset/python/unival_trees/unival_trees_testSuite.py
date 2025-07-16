import unittest
from unival_trees import TreeNode, unival_trees

class Test(unittest.TestCase):
    def test_unival_trees(self):
        root = TreeNode(0, TreeNode(1), TreeNode(0, TreeNode(1, TreeNode(1), TreeNode(1)), TreeNode(0)))
        self.assertEqual(unival_trees(root), 5)

if __name__ == "__main__":
    unittest.main()