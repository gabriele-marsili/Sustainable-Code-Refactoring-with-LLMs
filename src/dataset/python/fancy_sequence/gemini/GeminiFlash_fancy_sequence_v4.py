class Fancy:
    def __init__(self):
        self.sequence = []
        self.add = 0
        self.mult = 1
        self.operations = []
        self.MOD = 10**9 + 7

    def append(self, val: int) -> None:
        self.sequence.append(val)
        self.operations.append((len(self.sequence) - 1, self.add, self.mult))

    def addAll(self, inc: int) -> None:
        self.add = (self.add + inc) % self.MOD

    def multAll(self, m: int) -> None:
        self.add = (self.add * m) % self.MOD
        self.mult = (self.mult * m) % self.MOD

    def getIndex(self, idx: int) -> int:
        if idx >= len(self.sequence):
            return -1

        val = self.sequence[idx]
        op_idx, op_add, op_mult = self.operations[idx]

        curr_mult = (self.mult * pow(op_mult, self.MOD - 2, self.MOD)) % self.MOD
        curr_add = (self.add - (op_add * curr_mult) % self.MOD) % self.MOD

        return (val * curr_mult + curr_add) % self.MOD