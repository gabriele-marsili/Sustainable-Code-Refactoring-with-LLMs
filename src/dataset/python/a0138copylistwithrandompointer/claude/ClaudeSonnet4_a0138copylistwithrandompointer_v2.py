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
    
    # Step 1: Create cloned nodes interleaved with original nodes
    node = head
    while node:
      cloned = Node(node.val, node.next, None)
      node.next = cloned
      node = cloned.next
    
    # Step 2: Set random pointers for cloned nodes
    node = head
    while node:
      if node.random:
        node.next.random = node.random.next
      node = node.next.next
    
    # Step 3: Separate the lists
    dummy = Node(0, None, None)
    cloned_tail = dummy
    node = head
    
    while node:
      cloned_node = node.next
      node.next = cloned_node.next
      cloned_tail.next = cloned_node
      cloned_tail = cloned_node
      node = node.next
    
    return dummy.next


class Node:
  def __init__(self, val, next, random):
    self.val = val
    self.next = next
    self.random = random