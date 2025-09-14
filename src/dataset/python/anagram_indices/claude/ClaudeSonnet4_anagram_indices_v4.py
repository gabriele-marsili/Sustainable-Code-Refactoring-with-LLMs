from collections import defaultdict

def anagram_indices(s, word):
    n = len(s)
    w = len(word)
    
    if n < w:
        return []
    
    word_count = defaultdict(int)
    window_count = defaultdict(int)
    
    for char in word:
        word_count[char] += 1
    
    for i in range(w):
        window_count[s[i]] += 1
    
    result = []
    if word_count == window_count:
        result.append(0)
    
    for i in range(w, n):
        window_count[s[i]] += 1
        window_count[s[i - w]] -= 1
        
        if window_count[s[i - w]] == 0:
            del window_count[s[i - w]]
        
        if word_count == window_count:
            result.append(i - w + 1)
    
    return result