from collections import deque


class Solution:
    def snakesAndLadders(self, board):
        n = len(board)
        target = n * n
        
        def get_position(num):
            row = (num - 1) // n
            col = (num - 1) % n
            if row % 2 == 1:
                col = n - 1 - col
            return n - 1 - row, col
        
        q = deque([1])
        visited = {1}
        moves = 0
        
        while q:
            for _ in range(len(q)):
                curr = q.popleft()
                
                if curr == target:
                    return moves
                
                for dice in range(1, 7):
                    next_pos = curr + dice
                    if next_pos > target:
                        break
                    
                    r, c = get_position(next_pos)
                    if board[r][c] != -1:
                        next_pos = board[r][c]
                    
                    if next_pos not in visited:
                        visited.add(next_pos)
                        q.append(next_pos)
            
            moves += 1
        
        return -1