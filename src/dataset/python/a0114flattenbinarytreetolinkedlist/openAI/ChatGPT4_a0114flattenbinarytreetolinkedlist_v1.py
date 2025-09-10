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
                # Find the rightmost node of the left subtree
                predecessor = current.left
                while predecessor.right:
                    predecessor = predecessor.right
                # Relink the right subtree
                predecessor.right = current.right
                # Move the left subtree to the right
                current.right = current.left
                current.left = None
            # Move to the next node
            current = current.right