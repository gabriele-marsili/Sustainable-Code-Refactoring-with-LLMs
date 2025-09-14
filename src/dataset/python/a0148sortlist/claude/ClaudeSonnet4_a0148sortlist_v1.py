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
    left = self.sortList(head)
    right = self.sortList(slow)

    return self.merge(left, right)

  def merge(self, l1, l2):
    dummy = ListNode(0)
    current = dummy
    
    while l1 and l2:
      if l1.val <= l2.val:
        current.next = l1
        l1 = l1.next
      else:
        current.next = l2
        l2 = l2.next
      current = current.next

    current.next = l1 or l2
    return dummy.next