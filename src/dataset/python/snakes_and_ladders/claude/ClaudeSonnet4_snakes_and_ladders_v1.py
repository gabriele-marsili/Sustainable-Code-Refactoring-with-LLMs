from collections import deque


class Solution:
    def snakesAndLadders(self, board):
        n = len(board)
        target = n * n
        
        q = deque([1])
        visited = {1}
        distance = 0
        
        while q:
            size = len(q)
            for _ in range(size):
                node = q.popleft()
                
                if node == target:
                    return distance
                
                for i in range(1, 7):
                    next_pos = node + i
                    if next_pos > target:
                        break
                    
                    # Convert to board coordinates
                    idx = next_pos - 1
                    row = n - 1 - idx // n
                    col = idx % n
                    if (idx // n) % 2 == 1:
                        col = n - 1 - col
                    
                    # Check for snake or ladder
                    if board[row][col] != -1:
                        next_pos = board[row][col]
                    
                    if next_pos not in visited:
                        visited.add(next_pos)
                        q.append(next_pos)
            
            distance += 1
        
        return -1