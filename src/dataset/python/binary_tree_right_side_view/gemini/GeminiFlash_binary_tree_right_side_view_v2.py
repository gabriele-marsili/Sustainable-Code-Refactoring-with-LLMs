from collections import deque


# Definition for a binary tree node.
class TreeNode(object):
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution(object):
    def rightSideView(self, root):
        """
        :type root: TreeNode
        :rtype: List[int]
        """
        if not root:
            return []

        res = []
        queue = deque([root])

        while queue:
            level_length = len(queue)
            rightmost_val = None

            for _ in range(level_length):
                node = queue.popleft()

                if node:
                    rightmost_val = node.val
                    if node.left:
                        queue.append(node.left)
                    if node.right:
                        queue.append(node.right)

            if rightmost_val is not None:
                res.append(rightmost_val)

        return res