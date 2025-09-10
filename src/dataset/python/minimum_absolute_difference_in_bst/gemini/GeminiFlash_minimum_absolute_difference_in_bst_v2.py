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
        self.prev = float('-inf')
        self.min_diff = float('inf')

        def inOrder(node):
            if not node:
                return

            inOrder(node.left)

            self.min_diff = min(self.min_diff, node.val - self.prev)
            self.prev = node.val

            inOrder(node.right)

        inOrder(root)
        return self.min_diff