class MinStack:
    __slots__ = ('stack',)

    def __init__(self):
        self.stack = []

    def push(self, val: int) -> None:
        current_min = self.stack[-1][1] if self.stack else val
        self.stack.append((val, val if val < current_min else current_min))

    def pop(self) -> None:
        self.stack.pop()

    def top(self) -> int:
        return self.stack[-1][0]

    def getMin(self) -> int:
        return self.stack[-1][1]