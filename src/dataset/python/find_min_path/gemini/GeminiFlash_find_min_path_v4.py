'''
Find min path

You are given an M by N matrix consisting of booleans that represents a board.
Each True boolean represents a wall. Each False boolean represents a tile you can walk on.
Given this matrix, a start coordinate, and an end coordinate,
return the minimum number of steps required to reach the end coordinate from the start.
If there is no possible path, then return null. You can move up, left, down, and right.
You cannot move through walls. You cannot wrap around the edges of the board.

Input:
[[f, f, f, f],
[t, t, f, t],
[f, f, f, f],
[f, f, f, f]]
start = (3, 0)
end = (0, 0)
Output: 7
Output explanation: Starting bottom left and ending top left,
the minimum number of steps required to reach the end is 7,
since we would need to go through (1, 2) because there is a wall everywhere else on the second row.

=========================================
BFS solution using queue.
    Time Complexity:    O(N * M)
    Space Complexity:   O(N * M)
'''


############
# Solution #
############

from collections import deque

def find_min_path(board, start, end):
    n = len(board)
    m = len(board[0])

    # create a visited array
    visited = [[False] * m for _ in range(n)]

    queue = deque([(start, 0)])
    directions = [(1, 0), (0, 1), (-1, 0), (0, -1)]

    start_row, start_col = start
    end_row, end_col = end

    if board[start_row][start_col]:
        return None

    while queue:
        (row, col), steps = queue.popleft()

        if row == end_row and col == end_col:
            return steps

        if visited[row][col]:
            continue
        visited[row][col] = True

        for dr, dc in directions:
            new_row, new_col = row + dr, col + dc

            if 0 <= new_row < n and 0 <= new_col < m and not board[new_row][new_col] and not visited[new_row][new_col]:
                queue.append(((new_row, new_col), steps + 1))

    return None