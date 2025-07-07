def convert(number):
    parts = []
    if number % 3 == 0:
        parts.append("Pling")
    if number % 5 == 0:
        parts.append("Plang")
    if number % 7 == 0:
        parts.append("Plong")
    return ''.join(parts) or str(number)