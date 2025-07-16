from find_second_largest_node import TreeNode, find_second_largest_node
import unittest

class Test(unittest.TestCase):
    def test_find_second_largest(self):
        tree = TreeNode(1)
        tree.left = TreeNode(5)
        tree.right = TreeNode(4)
        tree.left.left = TreeNode(2)
        tree.left.right = TreeNode(8)
        tree.right.left = TreeNode(12)
        tree.right.right = TreeNode(7)
        self.assertEqual(find_second_largest_node(tree).val, 7)

if __name__ == "__main__":
    unittest.main()