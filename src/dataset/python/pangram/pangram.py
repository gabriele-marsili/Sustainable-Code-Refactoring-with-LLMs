import string
def is_pangram(sentence):
	pangram = string.ascii_lowercase
	arr = sentence.lower()
	return set(pangram).issubset(arr)

