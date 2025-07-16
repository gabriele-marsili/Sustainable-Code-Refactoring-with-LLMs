import unittest
from find_max_branch_sum import find_max_branch_sum, TreeNode

class Test(unittest.TestCase):
    def test_max_branch_sum(self):
        tree = TreeNode(1, TreeNode(2, TreeNode(4), TreeNode(5)), TreeNode(3, TreeNode(6), TreeNode(7)))
        self.assertEqual(find_max_branch_sum(tree), 11)

if __name__ == "__main__":
    unittest.main()