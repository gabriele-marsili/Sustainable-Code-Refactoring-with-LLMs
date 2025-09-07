# -*- coding: utf-8 -*-

from utils.list.ListNode import ListNode


class Solution:
    def partition(self, head: ListNode, x: int) -> ListNode:
        less_head = ListNode(0)
        greater_head = ListNode(0)
        less_tail, greater_tail = less_head, greater_head

        while head:
            if head.val < x:
                less_tail.next = head
                less_tail = less_tail.next
            else:
                greater_tail.next = head
                greater_tail = greater_tail.next
            head = head.next

        less_tail.next = greater_head.next
        greater_tail.next = None
        return less_head.next