def count_words(sentence):
    sentence = sentence.replace('\n', ' ').replace('\t', ' ')
    sentence = ''.join([c if c.isalnum() or c == "'"  else ' ' for c in sentence])
    words = sentence.lower().strip("'").split()
    word = [e.strip("'") for e in words]
    wordcount = {}
    for i in word:
        if i in wordcount:
           wordcount[i] += 1
        else:
           wordcount[i] = 1
    return wordcount
