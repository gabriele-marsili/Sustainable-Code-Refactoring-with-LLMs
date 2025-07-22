def convert(number):
    return (
        ("Pling" * (number % 3 == 0))
        + ("Plang" * (number % 5 == 0))
        + ("Plong" * (number % 7 == 0))
    ) or str(number)
