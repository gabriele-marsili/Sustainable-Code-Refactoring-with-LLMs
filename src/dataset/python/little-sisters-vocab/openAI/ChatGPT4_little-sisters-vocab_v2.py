def add_prefix_un(word):
    """
    :param word: str of a root word
    :return: str of root word with un prefix
    """
    return f"un{word}"


def make_word_groups(vocab_words):
    """
    :param vocab_words: list of vocabulary words with a prefix.
    :return: str of prefix followed by vocabulary words with
             prefix applied, separated by ' :: '.
    """
    prefix = vocab_words[0]
    return f"{prefix} :: {' :: '.join(prefix + word for word in vocab_words[1:])}"


def remove_suffix_ness(word):
    """
    :param word: str of word to remove suffix from.
    :return: str of word with suffix removed & spelling adjusted.
    """
    base_word = word[:-4]  # Remove 'ness'
    return base_word[:-1] + 'y' if base_word.endswith('i') else base_word


def noun_to_verb(sentence, index):
    """
    :param sentence: str that uses the word in sentence
    :param index: index of the word to remove and transform
    :return: str word that changes the extracted adjective to a verb.
    """
    return sentence.split()[index].rstrip('.') + 'en'