# -*- coding: utf-8 -*-

from typing import List
from utils.tree.TreeNode import TreeNode

class Solution:
    def preorderTraversal(self, root: TreeNode) -> List[int]:
        if not root:
            return []

        result, stack = [], [root]
        append_result = result.append
        extend_stack = stack.extend

        while stack:
            node = stack.pop()
            append_result(node.val)
            extend_stack(filter(None, [node.right, node.left]))

        return result