def steps(number):
    if number < 1: # raise a ValueError if the number is not natural
        raise ValueError("Only positive integers are allowed")
    i = 0 # set the initial steps tally to 0 
    while number != 1: # As long as the number is not 1, proceed with this loop
        if number % 2 == 0: # even?
            number = number / 2 # divide it by 2
        else: # else it is odd
            number = number * 3 + 1 # multiply it by 3 and add 1
        i+=1 # increment the number of steps undergone
    return i # return the total number of steps 
