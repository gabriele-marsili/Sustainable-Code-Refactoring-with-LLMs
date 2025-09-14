def place_n_queens(n):
    if n <= 0:
        return 0
    if n == 1:
        return 1
    
    columns = 0
    diag1 = 0
    diag2 = 0
    
    return backtracking(n, 0, columns, diag1, diag2)

def backtracking(n, row, columns, diag1, diag2):
    if row == n:
        return 1
    
    total = 0
    available = ((1 << n) - 1) & ~(columns | diag1 | diag2)
    
    while available:
        pos = available & -available
        available ^= pos
        
        total += backtracking(
            n,
            row + 1,
            columns | pos,
            (diag1 | pos) << 1,
            (diag2 | pos) >> 1
        )
    
    return total

def check_diagonals(order, pos):
    current_row = len(order)
    
    for i in range(current_row):
        if (i - order[i]) == (current_row - pos):
            return False
        if (i + order[i]) == (current_row + pos):
            return False
    
    return True