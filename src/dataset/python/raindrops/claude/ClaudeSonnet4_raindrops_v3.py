def convert(number):
    sounds = (
        (3, "Pling"),
        (5, "Plang"),
        (7, "Plong")
    )
    
    result = "".join(sound for divisor, sound in sounds if number % divisor == 0)
    return result or str(number)