def rotate(text, key):
    plain = "abcdefghijklmnopqrstuvwxyz"
    new_text = [] 
    for x in text:
        if 97 <= ord(x) < 123:
            if ord(x) + key > 122:
                new_text.append(chr(ord(x) + key - 26))
            else:
                new_text.append(chr(ord(x) + key))
        if 65 <= ord(x) <= 90:
            if ord(x) + key >= 90:
                new_text.append(chr(ord(x) + key - 26))
            else:
                new_text.append(chr(ord(x) + key))
        if not x.isalpha():
            new_text.append(x)
    return "".join(new_text)
