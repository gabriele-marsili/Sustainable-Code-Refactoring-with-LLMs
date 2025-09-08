# -*- coding: utf-8 -*-

from utils.list.ListNode import ListNode

class Solution:
    def reorderList(self, head):
        if not head or not head.next or not head.next.next:
            return
        
        # Find the middle of the list
        slow, fast = head, head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        
        # Reverse the second half of the list
        prev, curr = None, slow.next
        slow.next = None  # Split the list into two halves
        while curr:
            curr.next, prev, curr = prev, curr, curr.next
        
        # Merge the two halves
        first, second = head, prev
        while second:
            first.next, first = second, first.next
            second.next, second = first, second.next