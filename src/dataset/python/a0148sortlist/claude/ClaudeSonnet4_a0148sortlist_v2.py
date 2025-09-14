# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/sort-list/
#
# DESC:
# =====
# Sort a linked list in O(n log n) time using constant space complexity.
#
# Example 1:
# Input: 4->2->1->3
# Output: 1->2->3->4
#
# Example 2:
# Input: -1->5->3->4->0
# Output: -1->0->3->4->55
################################################
from utils.list.ListNode import ListNode


class Solution:
  def sortList(self, head: ListNode) -> ListNode:
    if not head or not head.next:
      return head

    # Find middle and split
    slow = fast = head
    prev = None
    while fast and fast.next:
      prev = slow
      slow = slow.next
      fast = fast.next.next
    prev.next = None

    # Recursively sort and merge
    return self.merge(self.sortList(head), self.sortList(slow))

  def merge(self, head1, head2):
    if not head1:
      return head2
    if not head2:
      return head1
    
    if head1.val <= head2.val:
      head1.next = self.merge(head1.next, head2)
      return head1
    else:
      head2.next = self.merge(head1, head2.next)
      return head2