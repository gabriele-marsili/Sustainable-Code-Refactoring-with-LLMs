def is_isogram(string):
    cleaned_string = string.replace(" ", "").replace("-", "").lower()
    return len(cleaned_string) == len(set(cleaned_string))