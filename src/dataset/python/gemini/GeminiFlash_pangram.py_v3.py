import string

def is_pangram(sentence):
    target_letters = set(string.ascii_lowercase)
    found_letters = set()

    for char in sentence:
        lower_char = char.lower()
        if lower_char.isalpha():
            found_letters.add(lower_char)
            if len(found_letters) == len(target_letters):
                return True
    
    return len(found_letters) == len(target_letters)