# -*- coding: utf-8 -*-

from typing import List
from collections import deque
from utils.tree.TreeNode import TreeNode


class Solution:
    def zigzagLevelOrder(self, root: TreeNode) -> List[List[int]]:
        if not root:
            return []

        queue = deque([root])
        result = []
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