import unittest
import collections
from permutation_in_string import Solution

class TestCheckInclusion(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example_one(self):
        s1 = "ab"
        s2 = "eidbaooo"
        self.assertTrue(self.solution.checkInclusion(s1, s2), "Test Case 1 Failed: 'ab' permutation expected in 'eidbaooo'")

    def test_example_two(self):
        s1 = "ab"
        s2 = "eidboaoo"
        self.assertFalse(self.solution.checkInclusion(s1, s2), "Test Case 2 Failed: 'ab' permutation not expected in 'eidboaoo'")

    def test_s1_longer_than_s2(self):
        s1 = "abc"
        s2 = "ab"
        self.assertFalse(self.solution.checkInclusion(s1, s2), "Test Case 3 Failed: s1 longer than s2")

    def test_s1_same_length_as_s2_match(self):
        s1 = "abc"
        s2 = "bca"
        self.assertTrue(self.solution.checkInclusion(s1, s2), "Test Case 4 Failed: s1 same length as s2, expected match")

    def test_s1_same_length_as_s2_no_match(self):
        s1 = "abc"
        s2 = "abd"
        self.assertFalse(self.solution.checkInclusion(s1, s2), "Test Case 5 Failed: s1 same length as s2, no match expected")

    def test_match_at_start(self):
        s1 = "adc"
        s2 = "cadde"
        self.assertTrue(self.solution.checkInclusion(s1, s2), "Test Case 6 Failed: Match at the beginning")

    def test_match_at_end(self):
        s1 = "hello"
        s2 = "ooolleoooleh"
        self.assertFalse(self.solution.checkInclusion(s1, s2), "Test Case 7 Failed: Expected false due to window content, not just size.") # Based on standard LeetCode example. 'oleh' is not a permutation of 'hello'

    def test_match_at_end_correct(self):
        s1 = "ooolle"
        s2 = "ooolleoooleh"
        self.assertTrue(self.solution.checkInclusion(s1, s2), "Test Case 8 Failed: Match at the end")

    def test_multiple_permutations(self):
        s1 = "aab"
        s2 = "baaab"
        self.assertTrue(self.solution.checkInclusion(s1, s2), "Test Case 9 Failed: Multiple permutations possible")

    def test_no_match_complex(self):
        s1 = "abc"
        s2 = "bdfgaaa"
        self.assertFalse(self.solution.checkInclusion(s1, s2), "Test Case 10 Failed: No match in a longer string")

    def test_s1_with_duplicates(self):
        s1 = "aabb"
        s2 = "abababab"
        self.assertTrue(self.solution.checkInclusion(s1, s2), "Test Case 11 Failed: s1 with duplicates, multiple occurrences")

    def test_s1_is_empty(self):
        s1 = ""
        s2 = "anywhere"
        self.assertTrue(self.solution.checkInclusion(s1, s2), "Test Case 12 Failed: s1 is empty (technically a permutation of an empty string is always a substring)") # The current code might need adjustment for this edge case based on problem specification, but assuming it should pass if empty string is allowed.

    def test_s2_is_empty(self):
        s1 = "a"
        s2 = ""
        self.assertFalse(self.solution.checkInclusion(s1, s2), "Test Case 13 Failed: s2 is empty and s1 is not")

    def test_s1_and_s2_empty(self):
        s1 = ""
        s2 = ""
        self.assertTrue(self.solution.checkInclusion(s1, s2), "Test Case 14 Failed: s1 and s2 are empty")

if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)