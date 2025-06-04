# Test 1
# Correct result => True
p = TreeNode(1, TreeNode(2), TreeNode(3))
q = TreeNode(1, TreeNode(2), TreeNode(3))
print(is_same_tree(p, q))

# Test 2
# Correct result => False
p = TreeNode(1, TreeNode(2))
q = TreeNode(1, None, TreeNode(2))
print(is_same_tree(p, q))