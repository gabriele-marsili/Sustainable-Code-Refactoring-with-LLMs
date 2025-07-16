import unittest
from diameter_of_binary_tree import TreeNode, diameter_of_binary_tree

class Test(unittest.TestCase):
    def test_diameter(self):
        # Test 1
        # Correct result => 6
        tree = TreeNode(3, TreeNode(1, None, TreeNode(2, TreeNode(7))), TreeNode(4, None, TreeNode(5)))
        self.assertEqual(diameter_of_binary_tree(tree), 6)

        # Test 2
        # Correct result => 5
        tree = TreeNode(5, TreeNode(3, TreeNode(2, TreeNode(1)), TreeNode(4, None, TreeNode(8))), TreeNode(6))
        self.assertEqual(diameter_of_binary_tree(tree), 5)

if __name__ == "__main__":
    unittest.main()