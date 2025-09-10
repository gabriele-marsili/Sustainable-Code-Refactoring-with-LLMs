from typing import List
from collections import defaultdict, deque

class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        in_degree = [0] * numCourses
        graph = defaultdict(list)

        for post, prev in prerequisites:
            graph[prev].append(post)
            in_degree[post] += 1

        queue = deque([i for i in range(numCourses) if in_degree[i] == 0])

        visited = 0
        while queue:
            course = queue.popleft()
            visited += 1
            for neighbor in graph[course]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)

        return visited == numCourses