# -*- coding: utf-8 -*-
from typing import List

class Solution:
    def restoreIpAddresses(self, s: str) -> List[str]:
        length = len(s)
        if length > 12 or length < 4:
            return []

        def is_valid(segment: str) -> bool:
            return 0 <= int(segment) <= 255 and (segment == "0" or segment[0] != "0")

        result = []
        for i in range(1, min(4, length - 2)):
            for j in range(i + 1, min(i + 4, length - 1)):
                for k in range(j + 1, min(j + 4, length)):
                    if length - k > 3:
                        continue
                    a, b, c, d = s[:i], s[i:j], s[j:k], s[k:]
                    if is_valid(a) and is_valid(b) and is_valid(c) and is_valid(d):
                        result.append(f"{a}.{b}.{c}.{d}")
        return result