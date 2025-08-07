import string

def is_pangram(sentence):
    # A bitmask to keep track of found lowercase English letters.
    # Each bit from 0 to 25 corresponds to a letter 'a' through 'z'.
    found_letters_mask = 0

    # The mask representing all 26 lowercase English letters found.
    # (1 << 26) generates a number with the 26th bit set (2^26).
    # Subtracting 1 sets all bits from 0 to 25.
    all_letters_mask = (1 << 26) - 1

    # Convert the sentence to lowercase once to avoid repeated conversions
    # and to simplify character comparison.
    # Iterating directly over the lowercased string is generally efficient.
    for char_code in sentence.lower():
        # Check if the character is a lowercase English letter.
        # This handles non-alphabetic characters gracefully without affecting the mask.
        if 'a' <= char_code <= 'z':
            # Calculate the bit position for the current character.
            # 'a' corresponds to bit 0, 'b' to bit 1, ..., 'z' to bit 25.
            bit_pos = ord(char_code) - ord('a')

            # Set the corresponding bit in the found_letters_mask.
            # Using |= ensures that if a bit is already set, it remains set.
            found_letters_mask |= (1 << bit_pos)

            # Optimization: If all 26 bits are set, we have found all required letters.
            # In this case, we can short-circuit and return True immediately.
            if found_letters_mask == all_letters_mask:
                return True
    
    # After iterating through the entire sentence, check if all 26 bits were set.
    # If found_letters_mask equals all_letters_mask, the sentence is a pangram.
    # Otherwise, at least one letter was missing.
    return found_letters_mask == all_letters_mask