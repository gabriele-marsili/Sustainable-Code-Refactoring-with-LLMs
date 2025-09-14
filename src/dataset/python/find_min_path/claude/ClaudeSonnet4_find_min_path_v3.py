from collections import deque

def find_min_path(board, start, end):
    if not board or not board[0]:
        return None
    
    n, m = len(board), len(board[0])
    
    if (start[0] < 0 or start[0] >= n or start[1] < 0 or start[1] >= m or
        end[0] < 0 or end[0] >= n or end[1] < 0 or end[1] >= m):
        return None
    
    if board[start[0]][start[1]] or board[end[0]][end[1]]:
        return None
    
    if start == end:
        return 0
    
    visited = set()
    queue = deque([(start[0], start[1], 0)])
    visited.add(start)
    
    directions = [(1, 0), (0, 1), (-1, 0), (0, -1)]
    
    while queue:
        x, y, steps = queue.popleft()
        
        for dx, dy in directions:
            nx, ny = x + dx, y + dy
            
            if (0 <= nx < n and 0 <= ny < m and 
                (nx, ny) not in visited and not board[nx][ny]):
                
                if (nx, ny) == end:
                    return steps + 1
                
                visited.add((nx, ny))
                queue.append((nx, ny, steps + 1))
    
    return None