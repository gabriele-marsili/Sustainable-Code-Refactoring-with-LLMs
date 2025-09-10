class Solution:

    def getPermutation(self, n: int, k: int) -> str:
        factorial = 1
        numbers = []
        for i in range(1, n + 1):
            factorial *= i
            numbers.append(i)

        k -= 1
        result = []
        for i in range(n):
            factorial //= (n - i)
            index = k // factorial
            result.append(numbers.pop(index))
            k %= factorial

        return ''.join(map(str, result))