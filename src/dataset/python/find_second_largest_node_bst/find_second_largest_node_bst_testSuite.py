# Test 1
# Correct result => 10
tree = TreeNode(5, TreeNode(3, TreeNode(1), TreeNode(4)), TreeNode(8, TreeNode(7), TreeNode(12, TreeNode(10, TreeNode(13)))))
print(find_second_largest_bst_1(tree).val)
print(find_second_largest_bst_2(tree).val)

# Test 2
# Correct result => 8
tree = TreeNode(5, TreeNode(3, TreeNode(1), TreeNode(4)), TreeNode(8, TreeNode(7), TreeNode(12)))
print(find_second_largest_bst_1(tree).val)
print(find_second_largest_bst_2(tree).val)

# Test 3
# Correct result => 4
tree = TreeNode(5, TreeNode(3, TreeNode(1), TreeNode(4)))
print(find_second_largest_bst_1(tree).val)
print(find_second_largest_bst_2(tree).val)

# Test 4
# Correct result => 7
tree = TreeNode(5, TreeNode(3, TreeNode(1), TreeNode(4)), TreeNode(8, TreeNode(6, None, TreeNode(7))))
print(find_second_largest_bst_1(tree).val)
print(find_second_largest_bst_2(tree).val)

# Test 5
# Correct result => 11
tree = TreeNode(5, TreeNode(3, TreeNode(1), TreeNode(4)), TreeNode(8, TreeNode(7), TreeNode(12, TreeNode(9, None, TreeNode(10, None, TreeNode(11))))))
print(find_second_largest_bst_1(tree).val)
print(find_second_largest_bst_2(tree).val)