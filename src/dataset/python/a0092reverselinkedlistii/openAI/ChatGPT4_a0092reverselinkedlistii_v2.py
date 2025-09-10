# -*- coding: utf-8 -*-

from utils.list.ListNode import ListNode

class Solution:
    def reverseBetween(self, head: ListNode, m: int, n: int) -> ListNode:
        if not head or m == n:
            return head

        dummy = ListNode(0)
        dummy.next = head
        prev = dummy

        # Move `prev` to the node before the reversal starts
        for _ in range(m - 1):
            prev = prev.next

        # Reverse the sublist
        current = prev.next
        for _ in range(n - m):
            temp = current.next
            current.next = temp.next
            temp.next = prev.next
            prev.next = temp

        return dummy.next