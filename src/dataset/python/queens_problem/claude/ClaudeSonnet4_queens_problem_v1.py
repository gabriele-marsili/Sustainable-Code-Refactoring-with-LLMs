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
    diag1 = [False] * (2 * n - 1)  # i - j + n - 1
    diag2 = [False] * (2 * n - 1)  # i + j
    
    return backtracking(columns, diag1, diag2, 0, n)

def backtracking(columns, diag1, diag2, row, n):
    if row == n:
        return 1

    total = 0
    for col in range(n):
        d1_idx = row - col + n - 1
        d2_idx = row + col
        
        if not columns[col] and not diag1[d1_idx] and not diag2[d2_idx]:
            columns[col] = diag1[d1_idx] = diag2[d2_idx] = True
            total += backtracking(columns, diag1, diag2, row + 1, n)
            columns[col] = diag1[d1_idx] = diag2[d2_idx] = False

    return total

def check_diagonals(order, pos):
    current_row = len(order)

    for i in range(current_row):
        if (i - order[i]) == (current_row - pos):
            return False
        if (i + order[i]) == (current_row + pos):
            return False

    return True