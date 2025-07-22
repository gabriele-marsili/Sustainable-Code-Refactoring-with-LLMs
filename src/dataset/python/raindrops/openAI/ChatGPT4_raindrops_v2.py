def convert(number):
    div_map = ((3, "Pling"), (5, "Plang"), (7, "Plong"))
    result = (sound for div, sound in div_map if number % div == 0)
    output = "".join(result)
    return output if output else str(number)
