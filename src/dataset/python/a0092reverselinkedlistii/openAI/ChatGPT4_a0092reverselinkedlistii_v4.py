# -*- coding: utf-8 -*-
from utils.list.ListNode import ListNode

class Solution:
    def reverseBetween(self, head: ListNode, m: int, n: int) -> ListNode:
        if m == n:
            return head

        dummy = ListNode(0)
        dummy.next = head
        prev = dummy

        for _ in range(m - 1):
            prev = prev.next

        reverse_start = prev.next
        curr = reverse_start.next

        for _ in range(n - m):
            reverse_start.next = curr.next
            curr.next = prev.next
            prev.next = curr
            curr = reverse_start.next

        return dummy.next