from typing import List

class Solution:
    def canCompleteCircuit(self, gas: List[int], cost: List[int]) -> int:
        total_tank, curr_tank, start_index = 0, 0, 0
        for i in range(len(gas)):
            diff = gas[i] - cost[i]
            total_tank += diff
            curr_tank += diff
            if curr_tank < 0:
                start_index = i + 1
                curr_tank = 0
        return start_index if total_tank >= 0 else -1