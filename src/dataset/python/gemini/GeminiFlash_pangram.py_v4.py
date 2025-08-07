import string

# Precompute the set of all lowercase English letters.
# This constant set is created only once when the module is loaded,
# avoiding redundant computation and memory allocation on every function call.
# This significantly reduces CPU cycles and improves performance, especially
# when `is_pangram` is called multiple times.
_ALPHABET_SET = set(string.ascii_lowercase)

def is_pangram(sentence):
    # Convert the input sentence to lowercase.
    # This ensures case-insensitivity, which is standard for pangram checks.
    # This operation creates a new string.
    sentence_lower = sentence.lower()

    # Create a set of unique characters present in the lowercase sentence.
    # Converting the sentence to a set allows for highly efficient O(1) average time
    # lookups during the subset check, as opposed to O(N) linear scans on a string.
    # This step is crucial for performance with longer sentences.
    sentence_chars_set = set(sentence_lower)

    # Check if all characters from the precomputed alphabet set are present
    # in the set of characters from the sentence.
    # The `issubset()` method is an optimized C implementation in Python
    # for set comparisons. It will efficiently determine if the sentence
    # contains all required letters, short-circuiting if a missing letter is found.
    return _ALPHABET_SET.issubset(sentence_chars_set)