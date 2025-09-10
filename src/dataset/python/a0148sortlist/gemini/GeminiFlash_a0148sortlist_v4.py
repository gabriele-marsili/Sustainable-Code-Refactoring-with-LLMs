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

    slow = head
    fast = head.next
    while fast and fast.next:
      slow = slow.next
      fast = fast.next.next

    second = slow.next
    slow.next = None

    left = self.sortList(head)
    right = self.sortList(second)

    return self.merge(left, right)

  def merge(self, left, right):
    dummy = ListNode(0)
    current = dummy

    while left and right:
      if left.val < right.val:
        current.next = left
        left = left.next
      else:
        current.next = right
        right = right.next
      current = current.next

    current.next = left or right

    return dummy.next