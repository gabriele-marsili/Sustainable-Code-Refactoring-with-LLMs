# -*- coding: utf-8 -*-

from utils.list.ListNode import ListNode
from utils.tree.TreeNode import TreeNode


class Solution:
    def sortedListToBST(self, head: ListNode) -> TreeNode:
        # Helper function to find the middle element of the linked list
        def find_middle(left, right):
            slow = fast = left
            while fast != right and fast.next != right:
                slow = slow.next
                fast = fast.next.next
            return slow

        # Recursive function to build the BST
        def convert_to_bst(left, right):
            if left == right:
                return None
            mid = find_middle(left, right)
            root = TreeNode(mid.val)
            root.left = convert_to_bst(left, mid)
            root.right = convert_to_bst(mid.next, right)
            return root

        return convert_to_bst(head, None)