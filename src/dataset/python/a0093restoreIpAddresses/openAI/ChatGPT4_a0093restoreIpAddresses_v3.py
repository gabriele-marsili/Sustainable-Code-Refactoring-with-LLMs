from typing import List

class Solution:
    def restoreIpAddresses(self, s: str) -> List[str]:
        def is_valid(segment: str) -> bool:
            return 0 <= int(segment) <= 255 and (segment == "0" or segment[0] != "0")

        def backtrack(start: int, parts: int, path: List[str]):
            if parts == 4:
                if start == len(s):
                    result.append(".".join(path))
                return
            for end in range(start + 1, min(start + 4, len(s) + 1)):
                segment = s[start:end]
                if is_valid(segment):
                    backtrack(end, parts + 1, path + [segment])

        if not (4 <= len(s) <= 12):
            return []
        
        result = []
        backtrack(0, 0, [])
        return result