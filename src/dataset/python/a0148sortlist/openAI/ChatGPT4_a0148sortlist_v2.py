# -*- coding: utf-8 -*-

from utils.list.ListNode import ListNode

class Solution:
    def sortList(self, head: ListNode) -> ListNode:
        if not head or not head.next:
            return head

        # Split the list into halves
        slow, fast = head, head.next
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        mid = slow.next
        slow.next = None

        # Recursively sort both halves
        left = self.sortList(head)
        right = self.sortList(mid)

        # Merge sorted halves
        return self.merge(left, right)

    def merge(self, l1: ListNode, l2: ListNode) -> ListNode:
        dummy = tail = ListNode(0)
        while l1 and l2:
            if l1.val < l2.val:
                tail.next, l1 = l1, l1.next
            else:
                tail.next, l2 = l2, l2.next
            tail = tail.next

        tail.next = l1 or l2
        return dummy.next