from typing import List
from itertools import combinations

class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        return [list(c) for c in combinations(range(1, n + 1), k)]