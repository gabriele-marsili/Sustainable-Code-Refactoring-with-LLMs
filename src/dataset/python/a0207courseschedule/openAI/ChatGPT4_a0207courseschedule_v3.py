from typing import List
from collections import defaultdict, deque

class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        in_degree = [0] * numCourses
        graph = defaultdict(list)

        for post, prev in prerequisites:
            in_degree[post] += 1
            graph[prev].append(post)

        queue = deque([i for i in range(numCourses) if in_degree[i] == 0])

        while queue:
            course = queue.popleft()
            for neighbor in graph[course]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)

        return sum(in_degree) == 0