from typing import List, Dict

class Solution:
    def cloneGraph(self, node: 'Node') -> 'Node':
        if not node:
            return None

        nodes: Dict[Node, Node] = {}
        
        def dfs(curr: 'Node') -> 'Node':
            if curr in nodes:
                return nodes[curr]
            
            clone = Node(curr.val, [])
            nodes[curr] = clone
            
            for neighbor in curr.neighbors:
                clone.neighbors.append(dfs(neighbor))
            
            return clone
        
        return dfs(node)

class Node:
    def __init__(self, val: int, neighbors: List['Node'] = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []