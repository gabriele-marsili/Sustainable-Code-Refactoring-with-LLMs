from typing import List, Optional

class Node:
    def __init__(self, val: int, neighbors: Optional[List['Node']] = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

class Solution:
    def cloneGraph(self, node: 'Node') -> 'Node':
        if not node:
            return None

        nodes = {}
        
        def dfs(current: 'Node') -> 'Node':
            if current in nodes:
                return nodes[current]
            
            clone = Node(current.val)
            nodes[current] = clone
            clone.neighbors = [dfs(neighbor) for neighbor in current.neighbors]
            return clone
        
        return dfs(node)