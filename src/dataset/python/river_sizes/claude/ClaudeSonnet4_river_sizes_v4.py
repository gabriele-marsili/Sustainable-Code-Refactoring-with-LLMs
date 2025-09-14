def river_sizes(matrix):
    if not matrix or not matrix[0]:
        return []
    
    n = len(matrix)
    m = len(matrix[0])
    results = []
    
    for i in range(n):
        for j in range(m):
            if matrix[i][j] == 1:
                size = 0
                stack = [(i, j)]
                
                while stack:
                    curr_i, curr_j = stack.pop()
                    
                    if (curr_i < 0 or curr_i >= n or 
                        curr_j < 0 or curr_j >= m or 
                        matrix[curr_i][curr_j] == 0):
                        continue
                    
                    matrix[curr_i][curr_j] = 0
                    size += 1
                    
                    stack.extend([
                        (curr_i - 1, curr_j),
                        (curr_i + 1, curr_j),
                        (curr_i, curr_j - 1),
                        (curr_i, curr_j + 1)
                    ])
                
                results.append(size)
    
    return results

def dfs(coord, matrix):
    (i, j) = coord

    if i < 0 or j < 0:
        return 0

    n = len(matrix)
    m = len(matrix[0])

    if i == n or j == m:
        return 0

    if matrix[i][j] == 0:
        return 0

    matrix[i][j] = 0
    size = 1

    dirs = [(-1, 0), (0, -1), (1, 0), (0, 1)]

    for d in dirs:
        size += dfs((i + d[0], j + d[1]), matrix)

    return size