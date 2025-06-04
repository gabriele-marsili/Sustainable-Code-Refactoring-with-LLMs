# Test 1
# Correct result => ['the', 'quick', 'brown', 'fox']
print(word_break('thequickbrownfox', ['quick', 'brown', 'the', 'fox']))

# Test 2
# Correct result => ['bedbath', 'and', 'beyond']
print(word_break('bedbathandbeyond', ['bed', 'bath', 'bedbath', 'and', 'beyond']))

# Test 3
# Correct result => ['bedbath', 'andbeyond']
print(word_break('bedbathandbeyond', ['bed', 'and', 'bath', 'bedbath', 'bathand', 'beyond', 'andbeyond']))

# Test 4
# Correct result => None ('beyo' doesn't exist)
print(word_break('bedbathandbeyo', ['bed', 'bath', 'bedbath', 'bathand', 'beyond']))

# Test 5
# Correct result => ['314', '15926535897', '9323', '8462643383279']
print(word_break('3141592653589793238462643383279', ['314', '49', '9001', '15926535897', '14', '9323', '8462643383279', '4', '793']))

# Test 6
# Correct result => ['i', 'like', 'like', 'i', 'mango', 'i', 'i', 'i']
print(word_break('ilikelikeimangoiii', ['mobile', 'samsung', 'sam', 'sung', 'man', 'mango', 'icecream', 'and', 'go', 'i', 'like', 'ice', 'cream']))