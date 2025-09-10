from collections import deque

def find_min_path(board, start, end):
    n, m = len(board), len(board[0])
    visited = set()
    queue = deque([(start, 0)])
    directions = [(1, 0), (0, 1), (-1, 0), (0, -1)]  # up, right, down, left

    while queue:
        (x, y), steps = queue.popleft()

        if (x, y) in visited:
            continue
        visited.add((x, y))

        if board[x][y] == 't':
            continue

        if (x, y) == end:
            return steps

        for dx, dy in directions:
            nx, ny = x + dx, y + dy
            if 0 <= nx < n and 0 <= ny < m and (nx, ny) not in visited:
                queue.append(((nx, ny), steps + 1))

    return None