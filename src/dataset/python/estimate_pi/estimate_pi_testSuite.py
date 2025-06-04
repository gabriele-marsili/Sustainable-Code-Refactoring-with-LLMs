# Test 1
# Correct result => Doesn't give a good estimation at all (often the integer part is wrong)
print(estimate_pi(10))

# Test 2
# Correct result => Gives a good estimation to the first decimal (3.1xxx)
print(estimate_pi(10000))

# Test 3
# Correct result => Gives a good estimation to the second decimal (3.14xxx)
print(estimate_pi(10000000))