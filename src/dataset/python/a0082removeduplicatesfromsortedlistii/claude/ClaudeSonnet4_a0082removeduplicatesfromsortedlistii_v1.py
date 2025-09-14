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
    if not head or not head.next:
      return head
    
    dummy = ListNode(0)
    dummy.next = head
    prev = dummy
    
    while head:
      if head.next and head.val == head.next.val:
        val = head.val
        while head and head.val == val:
          head = head.next
        prev.next = head
      else:
        prev = head
        head = head.next
    
    return dummy.next