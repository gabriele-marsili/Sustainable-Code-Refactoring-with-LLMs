from typing import List

class Solution:
    def cloneGraph(self, node: 'Node') -> 'Node':
        if not node:
            return None
        nodes = {}
        def dfs(curr):
            if curr in nodes:
                return nodes[curr]
            clone = Node(curr.val, [])
            nodes[curr] = clone
            clone.neighbors = [dfs(neighbor) for neighbor in curr.neighbors]
            return clone
        return dfs(node)

class Node:
    def __init__(self, val: int, neighbors: List['Node'] = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []