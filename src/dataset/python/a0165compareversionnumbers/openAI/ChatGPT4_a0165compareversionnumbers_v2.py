class Solution:
    def compareVersion(self, version1: str, version2: str) -> int:
        v1 = map(int, version1.split('.'))
        v2 = map(int, version2.split('.'))
        
        for num1, num2 in zip(v1, v2):
            if num1 != num2:
                return 1 if num1 > num2 else -1
        
        for num in v1:
            if num > 0:
                return 1
        
        for num in v2:
            if num > 0:
                return -1
        
        return 0