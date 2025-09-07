# -*- coding: utf-8 -*-

from utils.list.ListNode import ListNode

class Solution:
    def partition(self, head: ListNode, x: int) -> ListNode:
        less_head = ListNode(0)
        greater_head = ListNode(0)
        less = less_head
        greater = greater_head

        while head:
            if head.val < x:
                less.next = head
                less = less.next
            else:
                greater.next = head
                greater = greater.next
            head = head.next

        less.next = greater_head.next
        greater.next = None
        return less_head.next