from typing import List, Optional
from utils.tree.TreeNode import TreeNode


class Solution:
    def pathSum(self, root: Optional[TreeNode], target_sum: int) -> List[List[int]]:
        def dfs(node: Optional[TreeNode], remaining_sum: int, path: List[int], paths: List[List[int]]) -> None:
            if not node:
                return
            path.append(node.val)
            remaining_sum -= node.val
            if not node.left and not node.right and remaining_sum == 0:
                paths.append(path[:])
            else:
                dfs(node.left, remaining_sum, path, paths)
                dfs(node.right, remaining_sum, path, paths)
            path.pop()

        result = []
        dfs(root, target_sum, [], result)
        return result