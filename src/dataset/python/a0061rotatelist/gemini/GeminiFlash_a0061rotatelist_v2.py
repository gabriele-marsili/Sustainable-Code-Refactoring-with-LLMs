# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/rotate-list/
#
# DESC:
# =====
# Given a linked list, rotate the list to the right by k places, where k is non-negative.
#
# Example 1:
#
# Input: 1->2->3->4->5->NULL, k = 2
# Output: 4->5->1->2->3->NULL
# Explanation:
# rotate 1 steps to the right: 5->1->2->3->4->NULL
# rotate 2 steps to the right: 4->5->1->2->3->NULL
# Example 2:
#
# Input: 0->1->2->NULL, k = 4
# Output: 2->0->1->NULL
# Explanation:
# rotate 1 steps to the right: 2->0->1->NULL
# rotate 2 steps to the right: 1->2->0->NULL
# rotate 3 steps to the right: 0->1->2->NULL
# rotate 4 steps to the right: 2->0->1->NULL
#
################################################
from utils.list.ListNode import ListNode


class Solution:
  def rotateRight(self, head: ListNode, k: int) -> ListNode:
    if not head or k == 0:
      return head

    # Calculate the length of the list
    length = 1
    tail = head
    while tail.next:
      tail = tail.next
      length += 1

    # Effective rotation amount
    k %= length
    if k == 0:
      return head

    # Find the new head and tail
    new_tail_pos = length - k - 1
    new_tail = head
    for _ in range(new_tail_pos):
      new_tail = new_tail.next

    new_head = new_tail.next

    # Perform the rotation
    new_tail.next = None
    tail.next = head

    return new_head