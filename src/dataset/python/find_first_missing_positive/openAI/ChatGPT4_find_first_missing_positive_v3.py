def find_first_missing_1(a):
    n = len(a)
    for i in range(n):
        while 0 < a[i] <= n and a[i] != a[a[i] - 1]:
            a[a[i] - 1], a[i] = a[i], a[a[i] - 1]
    for i in range(n):
        if a[i] != i + 1:
            return i + 1
    return n + 1

def find_first_missing_2(a):
    n = len(a)
    for i in range(n):
        if a[i] <= 0 or a[i] > n:
            a[i] = n + 1
    for i in range(n):
        idx = abs(a[i]) - 1
        if idx < n and a[idx] > 0:
            a[idx] = -a[idx]
    for i in range(n):
        if a[i] > 0:
            return i + 1
    return n + 1