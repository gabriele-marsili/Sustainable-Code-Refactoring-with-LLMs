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

    nodeMap = {}
    curr = head

    # First pass: Create new nodes and store them in the map
    while curr:
      nodeMap[curr] = Node(curr.val, None, None)
      curr = curr.next

    curr = head

    # Second pass: Assign next and random pointers
    while curr:
      newNode = nodeMap[curr]
      newNode.next = nodeMap.get(curr.next)
      newNode.random = nodeMap.get(curr.random)
      curr = curr.next

    return nodeMap[head]


class Node:
  def __init__(self, val, next, random):
    self.val = val
    self.next = next
    self.random = random