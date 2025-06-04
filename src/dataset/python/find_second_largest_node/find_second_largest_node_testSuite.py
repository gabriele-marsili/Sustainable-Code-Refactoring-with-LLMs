# Test 1
# Correct result => 8
tree = TreeNode(1, TreeNode(5, TreeNode(2), TreeNode(8)), TreeNode(4, TreeNode(12), TreeNode(7)))
print(find_second_largest(tree).val)