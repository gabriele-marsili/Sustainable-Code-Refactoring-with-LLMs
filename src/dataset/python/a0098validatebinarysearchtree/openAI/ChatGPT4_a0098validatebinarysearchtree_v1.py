# -*- coding: utf-8 -*-

from utils.tree.TreeNode import TreeNode

class Solution:
    def isValidBST(self, root: TreeNode) -> bool:
        return self.helper(root, float('-inf'), float('inf'))

    def helper(self, node, min, max):
        if not node:
            return True
        if not (min < node.val < max):
            return False
        return self.helper(node.left, min, node.val) and self.helper(node.right, node.val, max)