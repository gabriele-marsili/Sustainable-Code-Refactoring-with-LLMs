# -*- coding: utf-8 -*-

from typing import List
from utils.tree.TreeNode import TreeNode

class Solution:
    def levelOrder(self, root: TreeNode) -> List[List[int]]:
        if root is None:
            return []

        from collections import deque
        queue = deque([root])
        result = []

        while queue:
            thisLevel = []
            for _ in range(len(queue)):
                node = queue.popleft()
                thisLevel.append(node.val)
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
            result.append(thisLevel)

        return result