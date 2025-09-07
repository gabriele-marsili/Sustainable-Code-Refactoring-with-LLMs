# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/
#
# DESC:
# =====
# Given a singly linked list where elements are sorted in ascending order,
# convert it to a height balanced BST.
#
# For this problem, a height-balanced binary tree is defined as a binary tree
# in which the depth of the two subtrees of every node never differ by more than 1.
#
# Example:
#
# Given the sorted linked list: [-10,-3,0,5,9],
#
# One possible answer is: [0,-3,9,-10,null,5], which represents the following height balanced BST:
#
#       0
#      / \
#    -3   9
#    /   /
#  -10  5
#
################################################
from utils.list.ListNode import ListNode
from utils.tree.TreeNode import TreeNode


class Solution:
    def sortedListToBST(self, head: ListNode) -> TreeNode:
        if not head:
            return None
        
        # Count nodes to determine size
        size = 0
        current = head
        while current:
            size += 1
            current = current.next
        
        # Use inorder simulation to build BST directly from linked list
        self.head = head
        return self._inorderToBST(0, size - 1)
    
    def _inorderToBST(self, start: int, end: int) -> TreeNode:
        if start > end:
            return None
        
        mid = (start + end) // 2
        
        # Build left subtree first (inorder traversal)
        left = self._inorderToBST(start, mid - 1)
        
        # Create root with current head value
        root = TreeNode(self.head.val)
        root.left = left
        
        # Move to next node
        self.head = self.head.next
        
        # Build right subtree
        root.right = self._inorderToBST(mid + 1, end)
        
        return root