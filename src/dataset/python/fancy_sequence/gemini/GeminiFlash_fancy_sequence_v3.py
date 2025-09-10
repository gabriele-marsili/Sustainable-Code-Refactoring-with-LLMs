class Fancy:
    def __init__(self):
        self.sequence = []
        self.add = 0
        self.multiply = 1
        self.operations = []
        self.mod = 10**9 + 7

    def append(self, val: int) -> None:
        self.sequence.append(val)
        self.operations.append((self.add, self.multiply))

    def addAll(self, inc: int) -> None:
        self.add = (self.add + inc) % self.mod

    def multAll(self, m: int) -> None:
        self.add = (self.add * m) % self.mod
        self.multiply = (self.multiply * m) % self.mod

    def getIndex(self, idx: int) -> int:
        if idx >= len(self.sequence):
            return -1

        initial_add, initial_multiply = self.operations[idx]
        
        current_multiply = (self.multiply * pow(initial_multiply, self.mod - 2, self.mod)) % self.mod
        current_add = (self.add - (initial_add * current_multiply)) % self.mod
        
        return (self.sequence[idx] * current_multiply + current_add) % self.mod