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
    if not head:
      return None
    
    before_head = ListNode(0)
    after_head = ListNode(0)
    before = before_head
    after = after_head
    
    current = head
    while current:
      next_node = current.next
      current.next = None
      
      if current.val < x:
        before.next = current
        before = current
      else:
        after.next = current
        after = current
      
      current = next_node
    
    before.next = after_head.next
    return before_head.next