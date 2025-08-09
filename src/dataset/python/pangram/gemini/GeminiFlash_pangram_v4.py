import string

def is_pangram(sentence):
    found_letters_mask = 0
    ALL_LETTERS_MASK = (1 << 26) - 1

    for char in sentence:
        char_code = ord(char.lower())
        
        if ord('a') <= char_code <= ord('z'):
            bit_position = char_code - ord('a')
            found_letters_mask |= (1 << bit_position)
            
            if found_letters_mask == ALL_LETTERS_MASK:
                return True
                
    return found_letters_mask == ALL_LETTERS_MASK