# Definition for a binary tree node.
class TreeNode(object):
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution(object):
    def __init__(self):
        self.prev = None
        self.ans = float("inf")

    def getMinimumDifference(self, root):
        """
        :type root: TreeNode
        :rtype: int
        """
        self.prev = None
        self.ans = float("inf")

        def inOrder(node):
            if not node:
                return

            inOrder(node.left)

            if self.prev is not None:
                self.ans = min(self.ans, abs(node.val - self.prev))

            self.prev = node.val

            inOrder(node.right)

        inOrder(root)
        return self.ans