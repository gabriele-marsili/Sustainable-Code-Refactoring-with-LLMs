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

    # First pass: Create new nodes and interweave them with original list
    curr = head
    while curr:
      new_node = Node(curr.val, curr.next, None)
      curr.next = new_node
      curr = new_node.next

    # Second pass: Assign random pointers to the new nodes
    curr = head
    while curr:
      if curr.random:
        curr.next.random = curr.random.next
      curr = curr.next.next

    # Third pass: Separate the original and copied lists
    curr = head
    new_head = head.next
    new_curr = new_head

    while curr:
      curr.next = new_curr.next
      curr = curr.next
      if curr:
        new_curr.next = curr.next
        new_curr = new_curr.next
      else:
        new_curr.next = None

    return new_head


class Node:
  def __init__(self, val, next, random):
    self.val = val
    self.next = next
    self.random = random