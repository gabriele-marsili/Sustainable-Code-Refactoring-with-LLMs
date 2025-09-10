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
        prev, ans = float("-inf"), float("inf")
        stack, current = [], root

        while stack or current:
            while current:
                stack.append(current)
                current = current.left

            current = stack.pop()
            ans = min(ans, current.val - prev)
            prev = current.val
            current = current.right

        return ans