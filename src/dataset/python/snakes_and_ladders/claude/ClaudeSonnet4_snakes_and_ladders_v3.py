from collections import deque


class Solution:
    def snakesAndLadders(self, board):
        n = len(board)
        target = n * n
        
        def get_position(square):
            row = (square - 1) // n
            col = (square - 1) % n
            if row % 2 == 1:
                col = n - 1 - col
            return n - 1 - row, col
        
        queue = deque([1])
        visited = {1}
        moves = 0
        
        while queue:
            for _ in range(len(queue)):
                curr = queue.popleft()
                
                if curr == target:
                    return moves
                
                for dice in range(1, 7):
                    next_square = curr + dice
                    if next_square > target:
                        break
                    
                    row, col = get_position(next_square)
                    if board[row][col] != -1:
                        next_square = board[row][col]
                    
                    if next_square not in visited:
                        visited.add(next_square)
                        queue.append(next_square)
            
            moves += 1
        
        return -1