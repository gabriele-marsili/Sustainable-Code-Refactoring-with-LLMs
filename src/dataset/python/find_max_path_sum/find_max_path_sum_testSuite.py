# Test 1
# Correct result => 18
tree = TreeNode(1, TreeNode(2, TreeNode(4), TreeNode(5)), TreeNode(3, TreeNode(6), TreeNode(7)))
print(max_path_sum(tree))

# Test 2
# Correct result => 10
tree = TreeNode(-1, TreeNode(-2, TreeNode(-4), TreeNode(-5)), TreeNode(3, TreeNode(2), TreeNode(5)))
print(max_path_sum(tree))

# Test 3
'''
        1
       / \
      7   3
     / \ / \
   -4 -5 6  2
'''
# Correct result => 17 (7 -> 1 -> 3 -> 6)
tree = TreeNode(1, TreeNode(7, TreeNode(-4), TreeNode(-5)), TreeNode(3, TreeNode(6), TreeNode(2)))
print(max_path_sum(tree))

# Test 4
'''
        1
       / \
      2   3
     / \ / \
   -4 -5 -2 -3
'''
# Correct result => 6 (2 -> 1 -> 3)
tree = TreeNode(1, TreeNode(2, TreeNode(-4), TreeNode(-5)), TreeNode(3, TreeNode(-2), TreeNode(-3)))
print(max_path_sum(tree))