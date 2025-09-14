'''
Count Divisibles in Range

Let us take a breather and tackle a problem so simple that its solution needs only a couple of
conditions, but not even any loops, let alone anything even more fancy. The difficulty is coming up
with the conditions that cover all possible cases of this problem exactly right, including all of the
potentially tricksy edge and corner cases, and not be off-by-one. Given three integers start, end
and n so that start <= end, count and return how many integers between start and end,
inclusive, are divisible by n.

Input: 7, 28, 4
Output: 6

=========================================
Find the close divisible to start (the smallest divisible in the range), calculate the difference between
that number and the end of the range, and in the end divide the difference by N.
    Time Complexity:    O(1)
    Space Complexity:   O(1)
'''


############
# Solution #
############

def count_divisibles_in_range(start, end, n):
    return max(0, end // n - (start - 1) // n)