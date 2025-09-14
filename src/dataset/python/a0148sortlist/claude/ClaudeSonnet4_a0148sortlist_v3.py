# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/sort-list/
#
# DESC:
# =====
# Sort a linked list in O(n log n) time using constant space complexity.
#
# Example 1:
# Input: 4->2->1->3
# Output: 1->2->3->4
#
# Example 2:
# Input: -1->5->3->4->0
# Output: -1->0->3->4->55
################################################
from utils.list.ListNode import ListNode


class Solution:
    def sortList(self, head: ListNode) -> ListNode:
        if not head or not head.next:
            return head
        
        length = self._getLength(head)
        dummy = ListNode(0)
        dummy.next = head
        
        size = 1
        while size < length:
            prev = dummy
            curr = dummy.next
            
            while curr:
                left = curr
                right = self._split(left, size)
                curr = self._split(right, size)
                prev = self._merge(prev, left, right)
            
            size <<= 1
        
        return dummy.next
    
    def _getLength(self, head):
        length = 0
        while head:
            length += 1
            head = head.next
        return length
    
    def _split(self, head, size):
        while size > 1 and head:
            head = head.next
            size -= 1
        
        if not head:
            return None
        
        next_head = head.next
        head.next = None
        return next_head
    
    def _merge(self, prev, left, right):
        while left and right:
            if left.val <= right.val:
                prev.next = left
                left = left.next
            else:
                prev.next = right
                right = right.next
            prev = prev.next
        
        prev.next = left or right
        
        while prev.next:
            prev = prev.next
        
        return prev
    
    def merge(self, head1, head2):
        dummy = ListNode(0)
        tail = dummy
        
        while head1 and head2:
            if head1.val <= head2.val:
                tail.next = head1
                head1 = head1.next
            else:
                tail.next = head2
                head2 = head2.next
            tail = tail.next
        
        tail.next = head1 or head2
        return dummy.next