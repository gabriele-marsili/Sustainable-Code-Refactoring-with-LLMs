class MinStack:
    __slots__ = ['stack']

    def __init__(self):
        self.stack = []

    def push(self, val: int) -> None:
        current_min = val if not self.stack else min(self.stack[-1][1], val)
        self.stack.append((val, current_min))

    def pop(self) -> None:
        self.stack.pop()

    def top(self) -> int:
        return self.stack[-1][0]

    def getMin(self) -> int:
        return self.stack[-1][1]