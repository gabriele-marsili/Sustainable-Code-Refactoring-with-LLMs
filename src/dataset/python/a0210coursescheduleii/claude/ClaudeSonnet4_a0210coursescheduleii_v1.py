# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/course-schedule-ii/
#
# DESC:
# =====
# There are a total of n courses you have to take, labeled from 0 to n-1.
#
# Some courses may have prerequisites,
# for example to take course 0 you have to first take course 1, which is expressed as a pair: [0,1]
#
# Given the total number of courses and a list of prerequisite pairs,
# return the ordering of courses you should take to finish all courses.
#
# There may be multiple correct orders, you just need to return one of them.
# If it is impossible to finish all courses, return an empty array.
#
# Example 1:
# Input: 2, [[1,0]]
# Output: [0,1]
# Explanation: There are a total of 2 courses to take. To take course 1 you should have finished
#              course 0. So the correct course order is [0,1] .
#
# Example 2:
# Input: 4, [[1,0],[2,0],[3,1],[3,2]]
# Output: [0,1,2,3] or [0,2,1,3]
# Explanation: There are a total of 4 courses to take. To take course 3 you should have finished both
#              courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0.
#              So one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3] .
#
# Note:
# The input prerequisites is a graph represented by a list of edges, not adjacency matrices.
# Read more about how a graph is represented.
# You may assume that there are no duplicate edges in the input prerequisites..
################################################
from typing import List
from collections import deque, defaultdict


class Solution:
  def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
    # Use arrays for better cache locality and memory efficiency
    indegree = [0] * numCourses
    graph = defaultdict(list)
    
    # Build graph and calculate indegrees
    for course, prereq in prerequisites:
      graph[prereq].append(course)
      indegree[course] += 1
    
    # Initialize queue with courses having no prerequisites
    queue = deque(i for i in range(numCourses) if indegree[i] == 0)
    result = []
    
    # Process courses using Kahn's algorithm
    while queue:
      course = queue.popleft()
      result.append(course)
      
      # Reduce indegree for dependent courses
      for dependent in graph[course]:
        indegree[dependent] -= 1
        if indegree[dependent] == 0:
          queue.append(dependent)
    
    # Return result if all courses can be taken, otherwise empty list
    return result if len(result) == numCourses else []