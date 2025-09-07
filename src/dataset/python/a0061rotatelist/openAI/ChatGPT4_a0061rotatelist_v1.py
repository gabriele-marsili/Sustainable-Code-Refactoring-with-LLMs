# -*- coding: utf-8 -*-

from utils.list.ListNode import ListNode

class Solution:
    def rotateRight(self, head: ListNode, k: int) -> ListNode:
        if not head or not head.next or k == 0:
            return head

        # Compute the size of the list and connect tail to head to form a circle
        size = 1
        tail = head
        while tail.next:
            tail = tail.next
            size += 1

        # Find the new head after rotation
        k %= size
        if k == 0:
            return head

        steps_to_new_head = size - k
        tail.next = head  # Form a circular list
        while steps_to_new_head > 0:
            tail = tail.next
            steps_to_new_head -= 1

        # Break the circle and set the new head
        new_head = tail.next
        tail.next = None
        return new_head