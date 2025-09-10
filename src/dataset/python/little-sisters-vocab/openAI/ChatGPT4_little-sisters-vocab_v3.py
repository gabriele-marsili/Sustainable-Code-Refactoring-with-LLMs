def add_prefix_un(word):
    return f"un{word}"

def make_word_groups(vocab_words):
    pref = vocab_words[0]
    return f"{pref} :: " + " :: ".join(f"{pref}{word}" for word in vocab_words[1:])

def remove_suffix_ness(word):
    newword = word[:-4]
    return f"{newword[:-1]}y" if newword.endswith('i') else newword

def noun_to_verb(sentence, index):
    return f"{sentence.split()[index].rstrip('.')}en"