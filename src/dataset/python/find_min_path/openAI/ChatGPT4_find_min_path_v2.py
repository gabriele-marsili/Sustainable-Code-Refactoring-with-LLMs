from collections import deque

def find_min_path(board, start, end):
    n, m = len(board), len(board[0])

    # Use a set for visited to reduce memory usage and lookup time
    visited = set()

    queue = deque([(start, 0)])
    directions = [(1, 0), (0, 1), (-1, 0), (0, -1)]  # up, right, down, left

    while queue:
        (x, y), steps = queue.popleft()

        # Skip if already visited
        if (x, y) in visited:
            continue

        visited.add((x, y))

        # Skip if not walkable
        if board[x][y]:
            continue

        # Return steps if end is reached
        if (x, y) == end:
            return steps

        # Add valid neighbors to the queue
        for dx, dy in directions:
            nx, ny = x + dx, y + dy
            if 0 <= nx < n and 0 <= ny < m and (nx, ny) not in visited:
                queue.append(((nx, ny), steps + 1))

    return None