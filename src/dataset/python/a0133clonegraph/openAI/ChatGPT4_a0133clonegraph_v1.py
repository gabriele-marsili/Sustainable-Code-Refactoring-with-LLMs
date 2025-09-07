# -*- coding: utf-8 -*-

from typing import List
from collections import deque

class Solution:
    def cloneGraph(self, node: 'Node') -> 'Node':
        if not node:
            return None
        
        nodes = {node: Node(node.val, [])}
        todo = deque([node])
        
        while todo:
            current = todo.popleft()
            cloned = nodes[current]
            
            for neighbor in current.neighbors:
                if neighbor not in nodes:
                    nodes[neighbor] = Node(neighbor.val, [])
                    todo.append(neighbor)
                cloned.neighbors.append(nodes[neighbor])
        
        return nodes[node]

class Node:
    def __init__(self, val, neighbors: List):
        self.val = val
        self.neighbors = neighbors