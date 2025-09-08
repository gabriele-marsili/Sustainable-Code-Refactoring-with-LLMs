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
    if not head or not head.next or not head.next.next:
      return

    # 1. Find the middle of the linked list
    slow = head
    fast = head
    while fast and fast.next:
      slow = slow.next
      fast = fast.next.next

    # 2. Reverse the second half of the linked list
    prev = None
    curr = slow.next
    slow.next = None  # Split the list into two halves

    while curr:
      next_node = curr.next
      curr.next = prev
      prev = curr
      curr = next_node

    # 3. Merge the two halves
    head1 = head
    head2 = prev

    while head2:
      next1 = head1.next
      next2 = head2.next

      head1.next = head2
      head2.next = next1

      head1 = next1
      head2 = next2