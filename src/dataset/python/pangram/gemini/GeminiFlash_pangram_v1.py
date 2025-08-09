import string

# Pre-compute the set of all lowercase English letters.
# This avoids re-creating this constant set for every function call,
# significantly reducing execution time and memory usage.
_ALPHABET_SET = set(string.ascii_lowercase)

def is_pangram(sentence):
    # Create a mutable copy of the set of required characters.
    # We will remove characters from this set as they are found in the sentence.
    # Copying a small set (26 elements) is very efficient.
    remaining_chars = _ALPHABET_SET.copy()

    # Iterate through each character in the input sentence.
    # This approach avoids creating a potentially large intermediate set
    # from the entire input sentence, which saves memory and processing time.
    for char in sentence:
        # Convert the character to lowercase to ensure case-insensitivity,
        # matching the behavior of the original code.
        lower_char = char.lower()
        
        # If the lowercase character is one of the characters we are still looking for,
        # remove it from our tracking set. Set lookup and removal are highly efficient (O(1) on average).
        if lower_char in remaining_chars:
            remaining_chars.remove(lower_char)
            
            # Optimization: If the set of remaining characters becomes empty,
            # it means we have found all 26 unique English letters.
            # We can return True immediately without processing the rest of the sentence.
            # This 'early exit' is crucial for minimizing execution time, especially
            # for long sentences that are pangrams.
            if not remaining_chars:
                return True
    
    # After iterating through the entire sentence, if 'remaining_chars' is empty,
    # it means all required letters were found, and thus the sentence is a pangram.
    # Otherwise, it means some letters were missing.
    return not remaining_chars