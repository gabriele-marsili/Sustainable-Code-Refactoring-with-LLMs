# -*- coding: utf-8 -*-

from typing import List
from utils.tree.TreeNode import TreeNode
from collections import deque

class Solution:
    def zigzagLevelOrder(self, root: TreeNode) -> List[List[int]]:
        if not root:
            return []

        result = []
        queue = deque([root])
        reverse = False

        while queue:
            level = deque()
            for _ in range(len(queue)):
                node = queue.popleft()
                if reverse:
                    level.appendleft(node.val)
                else:
                    level.append(node.val)
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
            result.append(list(level))
            reverse = not reverse

        return result