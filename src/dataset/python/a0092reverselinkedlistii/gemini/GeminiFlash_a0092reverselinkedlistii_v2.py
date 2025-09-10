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
  def reverseBetween(self, head: ListNode, left: int, right: int) -> ListNode:
    if left == right:
      return head

    dummy = ListNode(0)
    dummy.next = head
    pre = dummy

    for _ in range(left - 1):
      pre = pre.next

    curr = pre.next
    for _ in range(right - left):
      next_node = curr.next
      curr.next = next_node.next
      next_node.next = pre.next
      pre.next = next_node

    return dummy.next