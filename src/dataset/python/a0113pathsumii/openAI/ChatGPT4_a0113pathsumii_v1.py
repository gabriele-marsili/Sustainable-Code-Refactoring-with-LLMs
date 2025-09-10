# -*- coding: utf-8 -*-

from typing import List
from utils.tree.TreeNode import TreeNode


class Solution:
    def pathSum(self, root: TreeNode, sum: int) -> List[List[int]]:
        def dfs(node, target, path, result):
            if not node:
                return
            path.append(node.val)
            target -= node.val
            if not node.left and not node.right and target == 0:
                result.append(path[:])
            else:
                dfs(node.left, target, path, result)
                dfs(node.right, target, path, result)
            path.pop()

        result = []
        dfs(root, sum, [], result)
        return result