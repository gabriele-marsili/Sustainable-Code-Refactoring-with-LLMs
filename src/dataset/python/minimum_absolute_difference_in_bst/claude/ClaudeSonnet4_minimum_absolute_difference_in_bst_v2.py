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
        def inOrder(node, prev_val, min_diff):
            if not node:
                return prev_val, min_diff
            
            prev_val, min_diff = inOrder(node.left, prev_val, min_diff)
            
            if prev_val is not None:
                min_diff = min(min_diff, node.val - prev_val)
            
            prev_val = node.val
            
            return inOrder(node.right, prev_val, min_diff)
        
        _, result = inOrder(root, None, float("inf"))
        return result