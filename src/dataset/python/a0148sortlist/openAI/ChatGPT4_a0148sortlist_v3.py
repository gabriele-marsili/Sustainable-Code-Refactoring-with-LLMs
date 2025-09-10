# -*- coding: utf-8 -*-
from utils.list.ListNode import ListNode

class Solution:
    def sortList(self, head: ListNode) -> ListNode:
        if not head or not head.next:
            return head

        def split(head):
            slow, fast = head, head.next
            while fast and fast.next:
                slow = slow.next
                fast = fast.next.next
            mid = slow.next
            slow.next = None
            return head, mid

        def merge(head1, head2):
            dummy = tail = ListNode(0)
            while head1 and head2:
                if head1.val < head2.val:
                    tail.next, head1 = head1, head1.next
                else:
                    tail.next, head2 = head2, head2.next
                tail = tail.next
            tail.next = head1 or head2
            return dummy.next

        left, right = split(head)
        return merge(self.sortList(left), self.sortList(right))