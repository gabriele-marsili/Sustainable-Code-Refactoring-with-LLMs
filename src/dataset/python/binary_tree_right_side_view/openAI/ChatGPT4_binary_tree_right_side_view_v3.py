from collections import deque

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
        dq = deque([root])
        
        while dq:
            res.append(dq[-1].val)
            dq = deque(node for parent in dq for node in (parent.left, parent.right) if node)
        
        return res