# -*- coding: utf-8 -*-

from utils.list.ListNode import ListNode
from utils.tree.TreeNode import TreeNode


class Solution:
    def sortedListToBST(self, head: ListNode) -> TreeNode:
        if not head:
            return None
        if not head.next:
            return TreeNode(head.val)

        # Use the slow and fast pointer technique to find the middle node
        slow, fast, prev = head, head, None
        while fast and fast.next:
            prev = slow
            slow = slow.next
            fast = fast.next.next

        # Disconnect the left half from the middle
        if prev:
            prev.next = None

        # The middle element becomes the root
        root = TreeNode(slow.val)
        root.left = self.sortedListToBST(head)  # Left half
        root.right = self.sortedListToBST(slow.next)  # Right half

        return root