'''
Queens Problem

You have an N by N board. Write a function that, given N, returns the number of possible arrangements
of the board where N queens can be placed on the board without threatening each other,
i.e. no two queens share the same row, column, or diagonal.

=========================================
Backtracking solution.
    Time Complexity:    O(N!) (but I think it's much faster!)
    Space Complexity:   O(N)
* There are much faster solutions, like O(N^2)
'''


############
# Solution #
############

def place_n_queens(n):
    columns = [False] * n
    diagonals1 = [False] * (2 * n - 1)
    diagonals2 = [False] * (2 * n - 1)
    order = []

    return backtracking(columns, diagonals1, diagonals2, order, n)

def backtracking(columns, diagonals1, diagonals2, order, n):
    if len(order) == n:
        return 1

    total = 0
    row = len(order)

    for col in range(n):
        diag1_index = row - col + n - 1
        diag2_index = row + col

        if not columns[col] and not diagonals1[diag1_index] and not diagonals2[diag2_index]:
            order.append(col)
            columns[col] = True
            diagonals1[diag1_index] = True
            diagonals2[diag2_index] = True

            total += backtracking(columns, diagonals1, diagonals2, order, n)

            columns[col] = False
            diagonals1[diag1_index] = False
            diagonals2[diag2_index] = False
            order.pop()

    return total