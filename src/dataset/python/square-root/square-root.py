def square_root(number):
    root = number # Our initial value for root is the number itself 
    while root * root != number: # iterate while squared root is different from number
        # Newton-Raphson method as our root-finding algorithm
        # Newton's method with x squared function 
        root -= (root * root) / (2 * root)
        # Ascending linear search algorithm for integer root-finding 
        if root * root < number: # if the method underestimates the root, proceed
            l = int(root) + 1 # lower bound will be root estimation's ceiling
            while l * l < number: # iterate while squared l bound is smaller than number
                l += 1
            root = l # Our new root estimate is the found lower bound
    return root
