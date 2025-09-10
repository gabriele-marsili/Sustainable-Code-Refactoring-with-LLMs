# Definition for a binary tree node.
class TreeNode(object):
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution(object):
    def getMinimumDifference(self, root):
        """
        :type root: TreeNode
        :rtype: int
        """
        prev = None
        ans = float("inf")

        def inOrder(node):
            nonlocal prev, ans
            if not node:
                return
            inOrder(node.left)
            if prev is not None:
                ans = min(ans, node.val - prev)
            prev = node.val
            inOrder(node.right)

        inOrder(root)
        return ans