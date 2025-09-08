def is_isogram(string):
    cleaned_string = (char.lower() for char in string if char.isalpha())
    seen = set()
    return all(char not in seen and not seen.add(char) for char in cleaned_string)