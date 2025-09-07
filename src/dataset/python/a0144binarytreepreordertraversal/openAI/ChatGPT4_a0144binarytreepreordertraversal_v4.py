# -*- coding: utf-8 -*-
from typing import List
from utils.tree.TreeNode import TreeNode

class Solution:
    def preorderTraversal(self, root: TreeNode) -> List[int]:
        if not root:
            return []
        
        result, todo = [], [root]
        append_result = result.append
        extend_todo = todo.extend
        
        while todo:
            node = todo.pop()
            append_result(node.val)
            extend_todo(filter(None, (node.right, node.left)))
        
        return result