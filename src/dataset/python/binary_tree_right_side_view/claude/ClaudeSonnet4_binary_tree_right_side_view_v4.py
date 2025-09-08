from collections import deque


class TreeNode(object):
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution(object):
    def rightSideView(self, root):
        if not root:
            return []
        
        res = []
        dq = deque([root])
        
        while dq:
            level_size = len(dq)
            
            for i in range(level_size):
                node = dq.popleft()
                
                if i == level_size - 1:
                    res.append(node.val)
                
                if node.left:
                    dq.append(node.left)
                if node.right:
                    dq.append(node.right)
        
        return res