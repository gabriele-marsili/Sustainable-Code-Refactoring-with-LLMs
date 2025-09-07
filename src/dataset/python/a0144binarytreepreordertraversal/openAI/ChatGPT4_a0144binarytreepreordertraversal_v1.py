# -*- coding: utf-8 -*-

from typing import List
from utils.tree.TreeNode import TreeNode

class Solution:
    def preorderTraversal(self, root: TreeNode) -> List[int]:
        if not root:
            return []

        result, todo = [], [root]
        append_result = result.append
        append_todo = todo.append
        pop_todo = todo.pop

        while todo:
            node = pop_todo()
            append_result(node.val)
            if node.right:
                append_todo(node.right)
            if node.left:
                append_todo(node.left)

        return result