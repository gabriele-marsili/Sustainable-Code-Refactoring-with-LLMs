import unittest
from zigzag_level_order_traversal import zigzag_level_order_traversal, TreeNode

class Test(unittest.TestCase):
    def test_zigzag_level_order_traversal(self):
        tree = TreeNode(3, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))
        self.assertEqual(zigzag_level_order_traversal(tree), [[3], [20, 9], [15, 7]])

if __name__ == "__main__":
    unittest.main()