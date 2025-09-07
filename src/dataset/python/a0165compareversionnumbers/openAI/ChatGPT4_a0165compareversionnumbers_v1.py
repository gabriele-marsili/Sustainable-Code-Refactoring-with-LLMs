class Solution:
    def compareVersion(self, version1: str, version2: str) -> int:
        v1 = map(int, version1.split('.'))
        v2 = map(int, version2.split('.'))
        
        for a, b in zip(v1, v2):
            if a != b:
                return 1 if a > b else -1
        
        if sum(v1) > 0:
            return 1
        if sum(v2) > 0:
            return -1
        
        return 0