# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/copy-list-with-random-pointer/
#
# DESC:
# =====
# A linked list is given such that each node contains an additional random pointer
# which could point to any node in the list or null.
#
# Return a deep copy of the list.
#
#
#
# Example 1:
#
#
#
# Input:
# {
#   "$id":"1",
#   "next":{"$id":"2","next":null,"random":{"$ref":"2"},"val":2},
#   "random":{"$ref":"2"},
#   "val":1
# }
#
# Explanation:
# Node 1's value is 1, both of its next and random pointer points to Node 2.
# Node 2's value is 2, its next pointer points to null and its random pointer points to itself.
#
#
# Note:
#
# You must return the copy of the given head as a reference to the cloned list.
################################################


class Solution:
  def copyRandomList(self, head: 'Node') -> 'Node':
    if not head:
      return None
    
    node_map = {}
    current = head
    
    while current:
      node_map[current] = Node(current.val, None, None)
      current = current.next
    
    current = head
    while current:
      cloned = node_map[current]
      cloned.next = node_map.get(current.next)
      cloned.random = node_map.get(current.random)
      current = current.next
    
    return node_map[head]


class Node:
  __slots__ = ['val', 'next', 'random']
  
  def __init__(self, val, next, random):
    self.val = val
    self.next = next
    self.random = random