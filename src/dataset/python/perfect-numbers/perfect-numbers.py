def classify(number):
    if number <= 0:
       raise ValueError("The value is inferior or equal to zero which is not a natural number")
    else: # don't even need to have an else clause if you want. Makes the code cleaner
       aliquot = 0
       for i in range(1, number-1):
           if number % i == 0:
              aliquot += i
       if aliquot == number:
          return 'perfect'
       elif aliquot > number:
          return 'abundant'
       else:
          return 'deficient' 
