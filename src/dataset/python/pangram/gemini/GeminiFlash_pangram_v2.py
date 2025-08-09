def is_pangram(sentence):
    # A bitmask where each bit represents the presence of a letter from 'a' to 'z'.
    # For example, bit 0 corresponds to 'a', bit 1 to 'b', and so on.
    found_letters_mask = 0

    # The target mask represents all 26 bits set, meaning all letters from 'a' to 'z' are found.
    # (1 << 26) creates a number with the 27th bit set (0-indexed, so 2^26).
    # Subtracting 1 results in a mask where all bits from 0 to 25 are set.
    ALL_LETTERS_MASK = (1 << 26) - 1

    for char in sentence:
        char_lower = char.lower()
        # Check if the character is an English alphabet letter.
        # This range check is efficient.
        if 'a' <= char_lower <= 'z':
            # Calculate the bit position for the current letter.
            # 'a' corresponds to bit 0, 'b' to bit 1, etc.
            bit_position = ord(char_lower) - ord('a')
            
            # Set the corresponding bit in the found_letters_mask.
            # The bitwise OR operation efficiently updates the mask.
            found_letters_mask |= (1 << bit_position)
            
            # Early exit: If all 26 letters have been found, we can stop processing
            # the rest of the sentence immediately, saving computational resources.
            if found_letters_mask == ALL_LETTERS_MASK:
                return True
                
    # After iterating through the entire sentence, return True if all letters were found,
    # otherwise return False.
    return found_letters_mask == ALL_LETTERS_MASK