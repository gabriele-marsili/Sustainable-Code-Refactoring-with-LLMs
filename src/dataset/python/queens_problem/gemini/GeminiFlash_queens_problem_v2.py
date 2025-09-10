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
    order = []
    return backtracking(columns, order, n)

def backtracking(columns, order, n):
    if len(order) == n:
        return 1

    total = 0

    for i in range(n):
        if not columns[i] and check_diagonals(order, i):
            order.append(i)
            columns[i] = True
            total += backtracking(columns, order, n)
            columns[i] = False
            order.pop()

    return total

def check_diagonals(order, pos):
    current_row = len(order)

    for i in range(current_row):
        if abs(order[i] - pos) == current_row - i:
            return False

    return True