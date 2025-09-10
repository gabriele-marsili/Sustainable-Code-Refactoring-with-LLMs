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

        current = prev.next
        for _ in range(n - m):
            temp = current.next
            current.next = temp.next
            temp.next = prev.next
            prev.next = temp

        return dummy.next