# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/reorder-list/
#
# DESC:
# =====
# Given a singly linked list L: L0→L1→…→Ln-1→Ln,
# reorder it to: L0→Ln→L1→Ln-1→L2→Ln-2→…
#
# You may not modify the values in the list's nodes, only nodes itself may be changed.
#
# Example 1:
# Given 1->2->3->4, reorder it to 1->4->2->3.
#
# Example 2:
# Given 1->2->3->4->5, reorder it to 1->5->2->4->3.
################################################
from utils.list.ListNode import ListNode


class Solution:
  def reorderList(self, head):
    if not head or not head.next:
      return
    
    # Find middle using two pointers
    slow = fast = head
    while fast.next and fast.next.next:
      slow = slow.next
      fast = fast.next.next

    # Split and reverse second half
    second = slow.next
    slow.next = None
    
    prev = None
    while second:
      next_node = second.next
      second.next = prev
      prev = second
      second = next_node

    # Merge two halves
    first = head
    second = prev
    while second:
      first_next = first.next
      second_next = second.next
      first.next = second
      second.next = first_next
      first = first_next
      second = second_next