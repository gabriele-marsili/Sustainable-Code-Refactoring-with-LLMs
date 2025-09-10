# -*- coding: utf-8 -*-

from utils.tree.TreeNode import TreeNode


class Solution:
    def flatten(self, root: TreeNode) -> None:
        """
        Do not return anything, modify root in-place instead.
        """
        if not root:
            return
        
        current = root
        while current:
            if current.left:
                predecessor = current.left
                while predecessor.right:
                    predecessor = predecessor.right
                predecessor.right = current.right
                current.right = current.left
                current.left = None
            current = current.right