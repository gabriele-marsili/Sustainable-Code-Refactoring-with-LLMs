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
        
        length = self._get_length(head)
        self.current = head
        return self._build_bst(0, length - 1)
    
    def _get_length(self, head: ListNode) -> int:
        length = 0
        while head:
            length += 1
            head = head.next
        return length
    
    def _build_bst(self, start: int, end: int) -> TreeNode:
        if start > end:
            return None
        
        mid = (start + end) // 2
        left = self._build_bst(start, mid - 1)
        
        root = TreeNode(self.current.val)
        self.current = self.current.next
        
        root.left = left
        root.right = self._build_bst(mid + 1, end)
        
        return root

    def helper(self, nums):
        if not nums:
            return None
        pivot = len(nums) // 2
        root = TreeNode(nums[pivot])
        root.left = self.helper(nums[:pivot])
        root.right = self.helper(nums[pivot + 1:])
        return root