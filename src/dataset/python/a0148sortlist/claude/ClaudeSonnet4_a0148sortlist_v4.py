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

        prev, slow, fast = None, head, head
        while fast and fast.next:
            prev, slow, fast = slow, slow.next, fast.next.next
        prev.next = None

        left = self.sortList(head)
        right = self.sortList(slow)

        return self.merge(left, right)

    def merge(self, head1, head2):
        dummy = tail = ListNode(0)
        while head1 and head2:
            if head1.val <= head2.val:
                tail.next, head1 = head1, head1.next
            else:
                tail.next, head2 = head2, head2.next
            tail = tail.next

        tail.next = head1 or head2
        return dummy.next