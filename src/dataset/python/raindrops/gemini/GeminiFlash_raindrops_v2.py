def convert(number):
    result = []
    if number % 3 == 0:
        result.append("Pling")
    if number % 5 == 0:
        result.append("Plang")
    if number % 7 == 0:
        result.append("Plong")

    if result:
        return "".join(result)
    else:
        return str(number)