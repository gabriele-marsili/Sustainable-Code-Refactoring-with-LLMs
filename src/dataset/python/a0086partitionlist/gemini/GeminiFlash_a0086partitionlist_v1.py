# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/partition-list/
#
# DESC:
# =====
# Given a linked list and a value x,
# partition it such that all nodes less than x come before nodes greater than or equal to x.
#
# You should preserve the original relative order of the nodes in each of the two partitions.
#
# Example:
# Input: head = 1->4->3->2->5->2, x = 3
# Output: 1->2->2->4->3->5
#
################################################

from utils.list.ListNode import ListNode


class Solution:
  def partition(self, head: ListNode, x: int) -> ListNode:
    less_head = ListNode(0)
    greater_head = ListNode(0)
    less_tail = less_head
    greater_tail = greater_head

    curr = head
    while curr:
      if curr.val < x:
        less_tail.next = curr
        less_tail = curr
      else:
        greater_tail.next = curr
        greater_tail = curr
      curr = curr.next

    greater_tail.next = None  # Crucial for preventing cycles
    less_tail.next = greater_head.next

    return less_head.next