def convert(number):
    if number % 105 == 0:
        return "PlingPlangPlong"
    if number % 35 == 0:
        return "PlangPlong"
    if number % 21 == 0:
        return "PlingPlong"
    if number % 15 == 0:
        return "PlingPlang"
    if number % 7 == 0:
        return "Plong"
    if number % 5 == 0:
        return "Plang"
    if number % 3 == 0:
        return "Pling"
    return str(number)
