# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/clone-graph/
#
# DESC:
# =====
# Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.
# Each node in the graph contains a val (int) and a list (List[Node]) of its neighbors.
#
#
#
# Example:
#
#
#
# Input:
# {
#   "$id":"1",
#   "neighbors":[
#     {
#       "$id":"2",
#       "neighbors":[
#         {"$ref":"1"},
#         {
#           "$id":"3",
#           "neighbors":[
#             {"$ref":"2"},
#             {
#               "$id":"4",
#               "neighbors":[{"$ref":"3"},{"$ref":"1"}],
#               "val":4}
#           ],
#           "val":3}
#       ],
#       "val":2},
#     {"$ref":"4"}
#   ],
#   "val":1
# }
#
# Explanation:
# Node 1's value is 1, and it has two neighbors: Node 2 and 4.
# Node 2's value is 2, and it has two neighbors: Node 1 and 3.
# Node 3's value is 3, and it has two neighbors: Node 2 and 4.
# Node 4's value is 4, and it has two neighbors: Node 1 and 3.]
################################################
"""
# Definition for a Node.
class Node:
    def __init__(self, val, neighbors):
        self.val = val
        self.neighbors = neighbors
"""
from typing import List
from collections import deque


class Solution:
    def cloneGraph(self, node: 'Node') -> 'Node':
        if not node:
            return None
        
        cloned_nodes = {}
        queue = deque([node])
        cloned_nodes[node] = Node(node.val, [])
        
        while queue:
            current = queue.popleft()
            current_clone = cloned_nodes[current]
            
            for neighbor in current.neighbors:
                if neighbor not in cloned_nodes:
                    cloned_nodes[neighbor] = Node(neighbor.val, [])
                    queue.append(neighbor)
                current_clone.neighbors.append(cloned_nodes[neighbor])
        
        return cloned_nodes[node]


class Node:
    def __init__(self, val, neighbors: List):
        self.val = val
        self.neighbors = neighbors