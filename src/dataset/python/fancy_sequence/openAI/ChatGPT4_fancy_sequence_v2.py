class Fancy:
    def __init__(self):
        self.sequence = []
        self.total_add = 0
        self.total_mult = 1
        self.MOD = 1000000007

    def append(self, val: int) -> None:
        # Store the value adjusted by the current total_add and total_mult
        adjusted_val = (val - self.total_add) * pow(self.total_mult, -1, self.MOD) % self.MOD
        self.sequence.append(adjusted_val)

    def addAll(self, inc: int) -> None:
        self.total_add = (self.total_add + inc) % self.MOD

    def multAll(self, m: int) -> None:
        self.total_add = (self.total_add * m) % self.MOD
        self.total_mult = (self.total_mult * m) % self.MOD

    def getIndex(self, idx: int) -> int:
        if idx >= len(self.sequence):
            return -1
        return (self.sequence[idx] * self.total_mult + self.total_add) % self.MOD