# -*- coding: utf-8 -*-

from utils.list.ListNode import ListNode

class Solution:
    def sortList(self, head: ListNode) -> ListNode:
        if not head or not head.next:
            return head

        # Split the list into two halves
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

    def merge(self, head1: ListNode, head2: ListNode) -> ListNode:
        dummy = tail = ListNode(0)
        while head1 and head2:
            if head1.val < head2.val:
                tail.next, head1 = head1, head1.next
            else:
                tail.next, head2 = head2, head2.next
            tail = tail.next

        tail.next = head1 if head1 else head2
        return dummy.next