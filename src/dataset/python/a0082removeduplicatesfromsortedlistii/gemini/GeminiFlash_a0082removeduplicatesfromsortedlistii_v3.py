# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/
#
# DESC:
# =====
# Given a sorted linked list,
# delete all nodes that have duplicate numbers,
# leaving only distinct numbers from the original list.
#
# Example 1:
# Input: 1->2->3->3->4->4->5
# Output: 1->2->5
#
# Example 2:
# Input: 1->1->1->2->3
# Output: 2->3
#
################################################

from utils.list.ListNode import ListNode


class Solution:
  def deleteDuplicates(self, head: ListNode) -> ListNode:
    dummy = ListNode(0, head)
    prev = dummy
    curr = head

    while curr:
      if curr.next and curr.val == curr.next.val:
        # Skip all duplicate nodes
        while curr.next and curr.val == curr.next.val:
          curr = curr.next
        prev.next = curr.next  # Remove duplicates
      else:
        prev = prev.next
      curr = curr.next

    return dummy.next