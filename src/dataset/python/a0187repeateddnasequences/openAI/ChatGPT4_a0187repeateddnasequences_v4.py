# -*- coding: utf-8 -*-
from typing import List


class Solution:
    def findRepeatedDnaSequences(self, s: str) -> List[str]:
        if len(s) <= 10:
            return []
        
        seen, repeated = set(), set()
        for i in range(len(s) - 9):
            seg = s[i:i + 10]
            if seg in seen:
                repeated.add(seg)
            else:
                seen.add(seg)
        
        return list(repeated)