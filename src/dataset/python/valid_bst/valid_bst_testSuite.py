# Test 1
'''
    5
   / \
  1   4
     / \
    3   6
'''
# Correct result => False
root = TreeNode(5, TreeNode(1), TreeNode(4, TreeNode(3), TreeNode(6)))
print(is_valid_bst(root))

# Test 2
'''
    5
   / \
  1   6
     / \
    4   7
'''
# Correct result => False
root = TreeNode(5, TreeNode(1), TreeNode(6, TreeNode(4), TreeNode(7)))
print(is_valid_bst(root))

# Test 3
'''
    5
   / \
  1   6
     / \
    7   8
'''
# Correct result => False
root = TreeNode(5, TreeNode(1), TreeNode(6, TreeNode(7), TreeNode(8)))
print(is_valid_bst(root))

# Test 4
'''
    5
   / \
  1   7
     / \
    6   8
'''
# Correct result => True
root = TreeNode(5, TreeNode(1), TreeNode(7, TreeNode(6), TreeNode(8)))
print(is_valid_bst(root))