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

    sign = "-" if (numerator < 0) ^ (denominator < 0) else ""
    numerator = abs(numerator)
    denominator = abs(denominator)

    integer_part = numerator // denominator
    remainder = numerator % denominator

    if remainder == 0:
      return sign + str(integer_part)

    fractional_part = []
    remainder_map = {}
    remainder_index = 0

    while remainder != 0:
      if remainder in remainder_map:
        index = remainder_map[remainder]
        fractional_part.insert(index, '(')
        fractional_part.append(')')
        break

      remainder_map[remainder] = remainder_index
      remainder *= 10
      fractional_part.append(str(remainder // denominator))
      remainder %= denominator
      remainder_index += 1

    return sign + str(integer_part) + "." + "".join(fractional_part)