# -*- coding: utf-8 -*-
from utils.list.ListNode import ListNode

class Solution:
    def insertionSortList(self, head: ListNode) -> ListNode:
        if not head or not head.next:
            return head

        dummy = ListNode(0)
        dummy.next = head
        current = head

        while current and current.next:
            if current.val <= current.next.val:
                current = current.next
                continue

            to_insert = current.next
            current.next = to_insert.next

            prev = dummy
            while prev.next.val < to_insert.val:
                prev = prev.next

            to_insert.next = prev.next
            prev.next = to_insert

        return dummy.next