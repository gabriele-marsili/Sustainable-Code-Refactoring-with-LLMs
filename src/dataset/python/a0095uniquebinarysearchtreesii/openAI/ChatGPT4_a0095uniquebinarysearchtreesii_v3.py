from typing import List
from functools import lru_cache
from utils.tree.TreeNode import TreeNode

class Solution:
    def generateTrees(self, n: int) -> List[TreeNode]:
        return self.generate(1, n) if n >= 1 else []

    @lru_cache(None)
    def generate(self, start: int, end: int) -> List[TreeNode]:
        if start > end:
            return [None]

        result = []
        for num in range(start, end + 1):
            for left in self.generate(start, num - 1):
                for right in self.generate(num + 1, end):
                    root = TreeNode(num)
                    root.left = left
                    root.right = right
                    result.append(root)
        return result