from collections import deque

def find_min_path(board, start, end):
    n, m = len(board), len(board[0])

    # Use a set for visited to reduce memory usage and lookup time
    visited = set()

    queue = deque([(start, 0)])
    directions = [(1, 0), (0, 1), (-1, 0), (0, -1)]  # up, right, down, left

    while queue:
        position, steps = queue.popleft()

        # Skip if already visited
        if position in visited:
            continue

        visited.add(position)

        # Skip if not walkable
        if board[position[0]][position[1]] == 't':
            continue

        # Return steps if end is reached
        if position == end:
            return steps

        # Add valid neighbors to the queue
        for dx, dy in directions:
            x, y = position[0] + dx, position[1] + dy
            if 0 <= x < n and 0 <= y < m and (x, y) not in visited:
                queue.append(((x, y), steps + 1))

    return None