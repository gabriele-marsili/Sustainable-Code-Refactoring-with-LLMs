# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/reverse-linked-list-ii/
#
# DESC:
# =====
# Reverse a linked list from position m to n.
# Do it in one-pass.
#
# Note: 1 ≤ m ≤ n ≤ length of list.
#
# Example:
# Input: 1->2->3->4->5->NULL, m = 2, n = 4
# Output: 1->4->3->2->5->NULL
#
################################################
from utils.list.ListNode import ListNode


class Solution:
  def reverseBetween(self, head: ListNode, m: int, n: int) -> ListNode:
    if m == n:
      return head

    dummy = ListNode(0)
    dummy.next = head
    pre = dummy

    # Advance pre to the node before the sublist to be reversed
    for _ in range(m - 1):
      pre = pre.next

    current = pre.next

    # Reverse the sublist
    for _ in range(n - m):
      next_node = current.next
      current.next = next_node.next
      next_node.next = pre.next
      pre.next = next_node

    return dummy.next