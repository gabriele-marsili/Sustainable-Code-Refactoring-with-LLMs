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
        min_diff = float("inf")
        prev_val = None
        
        stack = []
        current = root
        
        while stack or current:
            while current:
                stack.append(current)
                current = current.left
            
            current = stack.pop()
            
            if prev_val is not None:
                min_diff = min(min_diff, current.val - prev_val)
            
            prev_val = current.val
            current = current.right
        
        return min_diff