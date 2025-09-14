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
    if start == end:
        return 0
    
    n = len(board)
    m = len(board[0])
    
    # Early exit if start or end positions are walls
    if board[start[0]][start[1]] or board[end[0]][end[1]]:
        return None

    visited = set()
    queue = deque([(start[0], start[1], 0)])
    visited.add(start)
    
    directions = [(1, 0), (0, 1), (-1, 0), (0, -1)]

    while queue:
        x, y, steps = queue.popleft()
        
        newSteps = steps + 1
        
        for dx, dy in directions:
            nx, ny = x + dx, y + dy
            
            if 0 <= nx < n and 0 <= ny < m and (nx, ny) not in visited and not board[nx][ny]:
                if (nx, ny) == end:
                    return newSteps
                
                visited.add((nx, ny))
                queue.append((nx, ny, newSteps))

    return None