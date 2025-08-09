import string

# Pre-compute the set of all lowercase English letters once
# This avoids re-creating the same set object on every function call,
# reducing CPU cycles, memory allocations, and garbage collection overhead.
_ALPHABET_SET = set(string.ascii_lowercase)

def is_pangram(sentence):
    """
    Checks if a given sentence is a pangram.

    A pangram is a sentence containing every letter of the alphabet at least once.
    The check is case-insensitive.

    Args:
        sentence (str): The input sentence to check.

    Returns:
        bool: True if the sentence is a pangram, False otherwise.
    """
    # Convert the entire sentence to lowercase and then create a set of its unique characters.
    # This efficiently collects all distinct characters present in the sentence.
    # The set conversion is an O(N) operation where N is the sentence length,
    # performed once.
    sentence_chars = set(sentence.lower())

    # Check if the pre-computed set of all alphabet letters is a subset of
    # the unique characters found in the sentence.
    # This is an efficient set-on-set operation, optimized in CPython.
    return _ALPHABET_SET.issubset(sentence_chars)