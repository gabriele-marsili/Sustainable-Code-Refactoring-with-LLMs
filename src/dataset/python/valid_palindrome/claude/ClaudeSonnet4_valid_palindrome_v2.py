class Solution(object):
    def isPalindrome(self, s):
        """
        :type s: str
        :rtype: bool
        """
        left, right = 0, len(s) - 1

        while left < right:
            s_l = s[left]
            if not s_l.isalnum():
                left += 1
                continue
            
            s_r = s[right]
            if not s_r.isalnum():
                right -= 1
                continue

            if s_l.lower() != s_r.lower():
                return False
            left += 1
            right -= 1
        return True