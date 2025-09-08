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
        dq = deque([root])
        
        while dq:
            n = len(dq)
            
            for i in range(n):
                node = dq.popleft()
                
                if i == n - 1:  # Last node in current level
                    res.append(node.val)
                
                if node.left:
                    dq.append(node.left)
                if node.right:
                    dq.append(node.right)
        
        return res