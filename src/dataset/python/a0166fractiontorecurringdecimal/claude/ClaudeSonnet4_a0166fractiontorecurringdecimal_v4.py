# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/fraction-to-recurring-decimal/
#
# DESC:
# =====
# Given two integers representing the numerator and denominator of a fraction, return the fraction in string format.
#
# If the fractional part is repeating, enclose the repeating part in parentheses.
#
# Example 1:
# Input: numerator = 1, denominator = 2
# Output: "0.5"
#
# Example 2:
# Input: numerator = 2, denominator = 1
# Output: "2"
#
# Example 3:
# Input: numerator = 2, denominator = 3
# Output: "0.(6)"
################################################


class Solution:
    def fractionToDecimal(self, numerator: int, denominator: int) -> str:
        if numerator == 0:
            return "0"
        
        result = []
        
        if (numerator < 0) ^ (denominator < 0):
            result.append('-')
        
        numerator, denominator = abs(numerator), abs(denominator)
        
        result.append(str(numerator // denominator))
        numerator %= denominator
        
        if numerator == 0:
            return ''.join(result)
        
        result.append('.')
        remainder_positions = {}
        
        while numerator != 0:
            if numerator in remainder_positions:
                index = remainder_positions[numerator]
                result.insert(index, '(')
                result.append(')')
                break
            
            remainder_positions[numerator] = len(result)
            numerator *= 10
            result.append(str(numerator // denominator))
            numerator %= denominator
        
        return ''.join(result)