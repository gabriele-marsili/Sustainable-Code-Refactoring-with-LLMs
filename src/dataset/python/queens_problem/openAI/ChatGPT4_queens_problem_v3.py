def place_n_queens(n):
    return backtracking(n, 0, 0, 0, 0)

def backtracking(n, row, columns, diag1, diag2):
    if row == n:
        return 1

    total = 0
    available_positions = (~(columns | diag1 | diag2)) & ((1 << n) - 1)

    while available_positions:
        position = available_positions & -available_positions
        available_positions -= position
        total += backtracking(n, row + 1, columns | position, 
                              (diag1 | position) << 1, 
                              (diag2 | position) >> 1)

    return total