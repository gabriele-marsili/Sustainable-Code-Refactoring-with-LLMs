def slices(series, length):
    digits =[]
    if length <= 0 or length > len(series):
       raise ValueError("The length is negative, equal to 0 or longer than the series")
    for i in range(0, len(series)-length+1):
        digits.append(series[i: i + length])
    return digits
