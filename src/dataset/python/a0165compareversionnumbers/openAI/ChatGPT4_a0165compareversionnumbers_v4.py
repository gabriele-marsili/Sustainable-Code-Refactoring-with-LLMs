class Solution:
    def compareVersion(self, version1: str, version2: str) -> int:
        v1 = map(int, version1.split('.'))
        v2 = map(int, version2.split('.'))
        
        for n1, n2 in zip(v1, v2):
            if n1 != n2:
                return 1 if n1 > n2 else -1
        
        for n in v1:
            if n > 0:
                return 1
        
        for n in v2:
            if n > 0:
                return -1
        
        return 0