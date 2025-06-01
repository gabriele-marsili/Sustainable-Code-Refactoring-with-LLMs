def is_isogram(string):
    string = string.replace(" ","")
    string = string.replace('-','')
    letter = [l for l in string.lower()]
    return len(letter) == len(set(letter))
        
       
