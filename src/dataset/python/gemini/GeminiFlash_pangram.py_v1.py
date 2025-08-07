import string

# Pre-calculate the set of all lowercase English alphabet characters.
# Using a frozenset makes it immutable and slightly more efficient for constant use,
# as it can be hashed and used in other sets/dicts more effectively.
_ALPHABET_FROZENSET = frozenset(string.ascii_lowercase)

def is_pangram(sentence):
    # Initialize an empty set to store unique lowercase alphabetic characters found in the sentence.
    # This set will grow up to a maximum of 26 relevant characters.
    found_chars = set()

    # Iterate over each character in the lowercase version of the sentence.
    # Converting the entire sentence to lowercase once upfront is generally more efficient
    # than converting each character individually within the loop for typical string lengths.
    for char in sentence.lower():
        # Check if the character is a lowercase English alphabet letter.
        # This range check is efficient and avoids adding non-alphabetic characters to the set.
        if 'a' <= char <= 'z':
            found_chars.add(char)
            
            # Optimization: If the number of unique alphabet characters found
            # matches the total number of alphabet characters (26),
            # it means all letters have been found. We can immediately conclude
            # it's a pangram and return True, avoiding further processing of the sentence.
            if len(found_chars) == len(_ALPHABET_FROZENSET):
                return True
    
    # If the loop completes without finding all 26 unique alphabet characters (i.e.,
    # the early exit condition was not met), then we perform the final check.
    # This verifies if the set of all required alphabet characters is a subset
    # of the characters collected from the sentence.
    return _ALPHABET_FROZENSET.issubset(found_chars)