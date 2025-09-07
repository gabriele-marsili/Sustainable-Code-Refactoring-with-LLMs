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
    def get_length(head):
      length = 0
      while head:
        length += 1
        head = head.next
      return length

    length = get_length(head)

    def build_tree(start, end):
      nonlocal head
      if start > end:
        return None

      mid = (start + end) // 2
      left = build_tree(start, mid - 1)
      root = TreeNode(head.val)
      root.left = left
      head = head.next
      root.right = build_tree(mid + 1, end)
      return root

    return build_tree(0, length - 1)