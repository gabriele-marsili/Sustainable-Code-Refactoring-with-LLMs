# Test 1
fancy = Fancy()
fancy.append(2)           # fancy sequence: [2]
fancy.addAll(3)           # fancy sequence: [2+3] -> [5]
fancy.append(7)           # fancy sequence: [5, 7]
fancy.multAll(2)          # fancy sequence: [5*2, 7*2] -> [10, 14]
print(fancy.getIndex(0))  # return 10
fancy.addAll(3)           # fancy sequence: [10+3, 14+3] -> [13, 17]
fancy.append(10)          # fancy sequence: [13, 17, 10]
fancy.multAll(2)          # fancy sequence: [13*2, 17*2, 10*2] -> [26, 34, 20]
print(fancy.getIndex(0))  # return 26
print(fancy.getIndex(1))  # return 34
print(fancy.getIndex(2))  # return 20