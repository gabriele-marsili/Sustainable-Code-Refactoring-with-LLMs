class ListNode:
    __slots__ = 'val', 'next'

    def __init__(self, x):
        self.val = x
        self.next = None


class Solution:
    def hasCycle(self, head):
        fast = slow = head
        while fast and (fast := fast.next) and (fast := fast.next):
            slow = slow.next
            if fast == slow:
                return True
        return False