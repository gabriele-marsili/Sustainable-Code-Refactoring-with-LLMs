def slices(series, length):
    if length <= 0 or length > len(series):
       raise ValueError("The length is negative, equal to 0 or longer than the series")
    return [series[i:i + length] for i in range(len(series) - length + 1)]