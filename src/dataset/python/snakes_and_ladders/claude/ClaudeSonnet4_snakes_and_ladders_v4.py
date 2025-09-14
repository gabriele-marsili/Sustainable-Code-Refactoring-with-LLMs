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
            distance += 1
            
            for _ in range(size):
                pos = q.popleft()
                
                for dice in range(1, 7):
                    next_pos = pos + dice
                    if next_pos > target:
                        break
                    
                    if next_pos == target:
                        return distance
                    
                    row_idx = (next_pos - 1) // n
                    row = n - 1 - row_idx
                    col = (next_pos - 1) % n if row_idx % 2 == 0 else n - 1 - ((next_pos - 1) % n)
                    
                    if board[row][col] != -1:
                        next_pos = board[row][col]
                    
                    if next_pos not in visited:
                        if next_pos == target:
                            return distance
                        visited.add(next_pos)
                        q.append(next_pos)
        
        return -1